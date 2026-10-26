import { CVData } from '../types/cv';
import { ACTION_VERBS } from './unstructuredParser';

export interface AtsAuditResult {
  score: number;
  grade: 'A+' | 'A' | 'B' | 'C' | 'D';
  metricsCount: number;
  actionVerbsCount: number;
  wordCount: number;
  strengths: string[];
  improvements: string[];
  checklist: {
    label: string;
    passed: boolean;
    recommendation: string;
  }[];
}

export function auditCV(cv: CVData): AtsAuditResult {
  const checklist = [];
  const strengths: string[] = [];
  const improvements: string[] = [];
  let score = 0;

  // 1. Contact Information Completeness (20 pts)
  const hasEmail = Boolean(cv.profile.email && cv.profile.email.includes('@'));
  const hasPhone = Boolean(cv.profile.phone && cv.profile.phone.length > 7);
  const hasLocation = Boolean(cv.profile.location && cv.profile.location.length > 3);
  const hasLinkedIn = Boolean(cv.profile.linkedin && cv.profile.linkedin.includes('linkedin.com'));

  const contactScore = (hasEmail ? 6 : 0) + (hasPhone ? 5 : 0) + (hasLocation ? 4 : 0) + (hasLinkedIn ? 5 : 0);
  score += contactScore;

  checklist.push({
    label: 'Datos de contacto esenciales y perfil LinkedIn',
    passed: contactScore >= 15,
    recommendation: contactScore >= 15
      ? 'Contacto completo (email, teléfono, ubicación y LinkedIn).'
      : 'Asegúrate de incluir email, teléfono, ubicación y enlace a LinkedIn para facilitar el contacto directo por reclutadores.'
  });

  // 2. Action Verbs in Experience (25 pts)
  const allAchievements = cv.experience.flatMap(e => e.achievements || []);
  let actionVerbsFound = 0;
  const verbRegexes = ACTION_VERBS.map(v => new RegExp(`\\b${v}`, 'i'));

  allAchievements.forEach(bullet => {
    if (verbRegexes.some(rx => rx.test(bullet))) {
      actionVerbsFound++;
    }
  });

  const verbRatio = allAchievements.length > 0 ? (actionVerbsFound / allAchievements.length) : 0;
  if (verbRatio >= 0.7) {
    score += 25;
    strengths.push(`Excelente uso de verbos de acción (${actionVerbsFound} logros inician con verbos resolutivos).`);
  } else if (verbRatio >= 0.4) {
    score += 15;
    improvements.push('Transforma viñetas pasivas en verbos de impacto (ej. "Arquitectó", "Lideró", "Optimizó").');
  } else {
    score += 5;
    improvements.push('Comienza cada logro de tu experiencia laboral con un verbo de acción orientado a impacto.');
  }

  checklist.push({
    label: 'Verbos de acción al inicio de logros',
    passed: verbRatio >= 0.5,
    recommendation: 'Los reclutadores técnicos buscan liderazgo y proactividad: inicia cada punto con verbos fuertes.'
  });

  // 3. Measurable Metrics & Quantifiable Impact (25 pts)
  const metricRegex = /\b(\d+[%kKmM€$]?|\+\d+%?|\d+\s*(?:usuarios|personas|días|horas|transacciones|millones|proyectos|equipos))\b/i;
  let metricsCount = 0;

  allAchievements.forEach(bullet => {
    if (metricRegex.test(bullet)) {
      metricsCount++;
    }
  });

  if (metricsCount >= 4) {
    score += 25;
    strengths.push(`Métricas de impacto cuantificables detectadas (${metricsCount} resultados con números, porcentajes o KPIs).`);
  } else if (metricsCount >= 2) {
    score += 15;
    improvements.push('Agrega más métricas cuantitativas (ej. "% de reducción de latencia", "ahorro de horas", "usuarios impactados").');
  } else {
    score += 5;
    improvements.push('Crucial: Añade cifras y métricas numéricas a tus logros. El 85% de los filtros técnicos priorizan resultados demostrables.');
  }

  checklist.push({
    label: 'Resultados cuantitativos y métricas de negocio',
    passed: metricsCount >= 3,
    recommendation: 'Reemplaza descripciones abstractas por números (ej. "aumentó 32%", "gestionó 1.5M€", "redujo incidentes en 60%").'
  });

  // 4. Skills & Certification Validation (15 pts)
  const totalSkills = cv.skillCategories.flatMap(c => c.skills).length;
  const totalCerts = cv.certifications.length;

  if (totalSkills >= 6 && totalCerts >= 1) {
    score += 15;
    strengths.push('Estructura sólida de habilidades técnicas y certificaciones reconocibles por ATS.');
  } else if (totalSkills >= 4) {
    score += 10;
    improvements.push('Añade certificaciones de plataformas oficiales (AWS, GCP, Scrum, Harvard, Coursera).');
  } else {
    score += 5;
    improvements.push('Desglosa tus habilidades en categorías claras para superar filtros automáticos de palabras clave.');
  }

  checklist.push({
    label: 'Palabras clave técnicas y certificaciones oficiales',
    passed: totalSkills >= 6,
    recommendation: 'Los ATS buscan concordancia de keywords con la vacante laboral. Agrupa tecnologías por stack.'
  });

  // 5. Bio and Target Role Clarity (15 pts)
  const hasTargetRole = Boolean(cv.profile.targetRole && cv.profile.targetRole.length > 5);
  const bioWords = (cv.profile.bio || '').split(/\s+/).filter(Boolean).length;
  const bioWellSized = bioWords >= 25 && bioWords <= 120;

  if (hasTargetRole && bioWellSized) {
    score += 15;
    strengths.push('Resumen profesional balanceado y puesto objetivo claro.');
  } else {
    score += 8;
    improvements.push('Mantén tu biografía entre 40 y 90 palabras, enfocándote en tu propuesta de valor única.');
  }

  checklist.push({
    label: 'Resumen profesional conciso y puesto objetivo',
    passed: hasTargetRole && bioWords >= 20,
    recommendation: 'Define con precisión el puesto al que aspiras y sintetiza tu experiencia en 3-4 líneas estratégicas.'
  });

  // Word Count & Density
  const fullText = JSON.stringify(cv);
  const totalWordCount = fullText.split(/\s+/).filter(Boolean).length;

  // Grade mapping
  let grade: AtsAuditResult['grade'] = 'C';
  if (score >= 90) grade = 'A+';
  else if (score >= 80) grade = 'A';
  else if (score >= 65) grade = 'B';
  else if (score >= 50) grade = 'C';
  else grade = 'D';

  return {
    score: Math.min(100, Math.max(0, score)),
    grade,
    metricsCount,
    actionVerbsCount: actionVerbsFound,
    wordCount: totalWordCount,
    strengths,
    improvements,
    checklist
  };
}
