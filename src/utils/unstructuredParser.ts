import { CVData, ExperienceItem, EducationItem, CertificationItem, SkillCategory, LanguageItem } from '../types/cv';

// High-impact recruiter-approved action verbs in Spanish
export const ACTION_VERBS = [
  'Lideró', 'Arquitectó', 'Diseñó', 'Implementó', 'Optimizó', 'Escaló',
  'Automatizó', 'Redujo', 'Incrementó', 'Desplegó', 'Coordinó', 'Gestionó',
  'Consolidó', 'Transformó', 'Estandarizó', 'Refactorizó', 'Mentoreó',
  'Auditoria', 'Dirigió', 'Pionero en', 'Aceleró', 'Maximizó', 'Modernizó'
];

// Passive phrases to active verb conversions
const VERB_REPLACEMENTS: [RegExp, string][] = [
  [/^(?:fui\s+responsable\s+de|era\s+el\s+encargado\s+de|me\s+encargaba\s+de|encargado\s+de)\s+(?:crear|hacer|desarrollar)\b/i, 'Desarrolló e implementó'],
  [/^(?:fui\s+responsable\s+de|era\s+el\s+encargado\s+de|me\s+encargaba\s+de|encargado\s+de)\s+(?:optimizar|mejorar)\b/i, 'Optimizó y mejoró'],
  [/^(?:fui\s+responsable\s+de|era\s+el\s+encargado\s+de|me\s+encargaba\s+de|encargado\s+de)\s+(?:liderar|manejar|dirigir)\b/i, 'Lideró y gestionó'],
  [/^(?:fui\s+responsable\s+de|responsable\s+de|me\s+tocó)\s+/i, 'Lideró '],
  [/^(?:trabajé\s+en|trabajaba\s+en|participé\s+en)\s+(?:el\s+desarrollo\s+de|la\s+creación\s+de)/i, 'Diseñó y construyó'],
  [/^(?:hice|realicé|hicimos)\s+/i, 'Implementó '],
  [/^(?:ayudé\s+a|apoyé\s+en)\s+/i, 'Colaboró activamente en '],
  [/^(?:creé|crear)\s+/i, 'Diseñó y desplegó '],
  [/^(?:arreglé|reparé)\s+/i, 'Resolvió y optimizó '],
  [/^(?:migré|migrar)\s+/i, 'Arquitectó la migración de ']
];

export function polishActionSentence(text: string): string {
  let cleaned = text.trim();
  // Strip leading bullet characters
  cleaned = cleaned.replace(/^[-•*▪▫–—]\s*/, '').trim();

  for (const [regex, replacement] of VERB_REPLACEMENTS) {
    if (regex.test(cleaned)) {
      cleaned = cleaned.replace(regex, replacement);
      break;
    }
  }

  // Capitalize first letter
  if (cleaned.length > 0) {
    cleaned = cleaned.charAt(0).toUpperCase() + cleaned.slice(1);
    // Ensure trailing period
    if (!cleaned.endsWith('.')) {
      cleaned += '.';
    }
  }

  return cleaned;
}

export function parseUnstructuredText(rawInput: string, currentData: CVData): CVData {
  const result: CVData = JSON.parse(JSON.stringify(currentData));
  if (!rawInput || rawInput.trim().length === 0) return result;

  const lines = rawInput.split('\n').map(l => l.trim()).filter(Boolean);

  // Extract Emails
  const emailRegex = /([a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,})/;
  const emailMatch = rawInput.match(emailRegex);
  if (emailMatch) {
    result.profile.email = emailMatch[1];
  }

  // Extract Phones
  const phoneRegex = /(?:\+?\d{1,3}[-.\s]?)?\(?\d{2,4}\)?[-.\s]?\d{3,4}[-.\s]?\d{3,4}/;
  const phoneMatch = rawInput.match(phoneRegex);
  if (phoneMatch && phoneMatch[0].replace(/\D/g, '').length >= 8) {
    result.profile.phone = phoneMatch[0];
  }

  // Extract Links
  const linkedinMatch = rawInput.match(/(https?:\/\/(?:www\.)?linkedin\.com\/in\/[^\s]+)/i);
  if (linkedinMatch) result.profile.linkedin = linkedinMatch[1];

  const githubMatch = rawInput.match(/(https?:\/\/(?:www\.)?github\.com\/[^\s]+)/i);
  if (githubMatch) result.profile.github = githubMatch[1];

  const websiteMatch = rawInput.match(/(https?:\/\/(?!linkedin|github)[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+[^\s]*)/i);
  if (websiteMatch) result.profile.website = websiteMatch[1];

  // Try extracting Name and Role from the very top lines if not marked by sections
  let candidateName = '';
  let candidateRole = '';
  let bioLines: string[] = [];

  type SectionType = 'UNKNOWN' | 'PROFILE' | 'EXPERIENCE' | 'EDUCATION' | 'SKILLS' | 'CERTIFICATIONS' | 'LANGUAGES';
  let currentSection: SectionType = 'UNKNOWN';

  const sectionHeaders: { type: SectionType; regex: RegExp }[] = [
    { type: 'PROFILE', regex: /^(?:perfil|sobre\s+m[ií]|resumen|acerca\s+de|bio|summary|about\s+me)\b/i },
    { type: 'EXPERIENCE', regex: /^(?:experiencia|trayectoria|historial\s+laboral|trabajo|empleo|experience|work\s+history)\b/i },
    { type: 'EDUCATION', regex: /^(?:educaci[oó]n|estudios|formaci[oó]n|formacion\s+acad[eé]mica|education)\b/i },
    { type: 'CERTIFICATIONS', regex: /^(?:certificaciones|certificados|cursos|capacitaciones|licencias|certifications|courses)\b/i },
    { type: 'SKILLS', regex: /^(?:habilidades|skills|tecnolog[ií]as|competencias|aptitudes|tools)\b/i },
    { type: 'LANGUAGES', regex: /^(?:idiomas|lenguajes|languages)\b/i },
  ];

  const sectionContents: Record<SectionType, string[]> = {
    UNKNOWN: [],
    PROFILE: [],
    EXPERIENCE: [],
    EDUCATION: [],
    CERTIFICATIONS: [],
    SKILLS: [],
    LANGUAGES: []
  };

  for (const line of lines) {
    // Check if line is a section header
    const cleanHeader = line.replace(/[:#*=-]/g, '').trim();
    let matchedSection: SectionType | null = null;

    for (const h of sectionHeaders) {
      if (h.regex.test(cleanHeader)) {
        matchedSection = h.type;
        break;
      }
    }

    if (matchedSection) {
      currentSection = matchedSection;
    } else {
      sectionContents[currentSection].push(line);
    }
  }

  // Parse Header / Unknown top lines for Name & Role
  const topLines = sectionContents.UNKNOWN;
  if (topLines.length > 0) {
    // First line that is not an email/phone/url is probably the name
    const nonMetaLines = topLines.filter(l => !l.includes('@') && !l.includes('http') && !l.match(/\+?\d{8,}/));
    if (nonMetaLines.length >= 1) {
      candidateName = nonMetaLines[0].replace(/^(?:nombre|name)[\s:]+/i, '').trim();
    }
    if (nonMetaLines.length >= 2) {
      candidateRole = nonMetaLines[1].replace(/^(?:puesto|cargo|rol|título|role|title)[\s:]+/i, '').trim();
    }
    if (nonMetaLines.length > 2) {
      bioLines = nonMetaLines.slice(2);
    }
  }

  if (candidateName) result.profile.name = candidateName;
  if (candidateRole) result.profile.targetRole = candidateRole;

  // Profile / Bio
  if (sectionContents.PROFILE.length > 0) {
    result.profile.bio = sectionContents.PROFILE.join(' ').trim();
  } else if (bioLines.length > 0) {
    result.profile.bio = bioLines.join(' ').trim();
  }

  // Parse Experience
  if (sectionContents.EXPERIENCE.length > 0) {
    const expLines = sectionContents.EXPERIENCE;
    const newExperiences: ExperienceItem[] = [];
    let currentExp: Partial<ExperienceItem> | null = null;

    for (const line of expLines) {
      const isBullet = /^[-•*▪▫–—]\s*/.test(line) || /^\d+\.\s*/.test(line);

      // Check if line looks like a job title / company / date
      const dateMatch = line.match(/\b(20\d\d|19\d\d)\b/);
      const isHeaderLine = !isBullet && (line.includes('|') || line.includes('-') || line.includes('–') || dateMatch || line.length < 60);

      if (isHeaderLine && (!currentExp || (currentExp.achievements && currentExp.achievements.length > 0))) {
        if (currentExp && currentExp.role) {
          newExperiences.push(completeExp(currentExp));
        }

        const parts = line.split(/[|–—\-,]/).map(p => p.trim());
        let role = parts[0] || 'Profesional';
        let company = parts[1] || 'Empresa';
        let dates = '2022 - Presente';

        if (parts.length >= 3) {
          dates = parts.slice(2).join(' ').trim();
        }

        currentExp = {
          id: `parsed-exp-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`,
          role,
          company,
          location: 'Remoto / Híbrido',
          startDate: dates.includes('-') ? dates.split('-')[0].trim() : '2022',
          endDate: dates.includes('-') ? dates.split('-')[1].trim() : 'Presente',
          isCurrent: dates.toLowerCase().includes('presente') || dates.toLowerCase().includes('actual'),
          employmentType: 'Tiempo Completo',
          achievements: [],
          technologies: []
        };
      } else if (currentExp) {
        // Achievement bullet
        const polished = polishActionSentence(line);
        if (polished.length > 5) {
          currentExp.achievements = currentExp.achievements || [];
          currentExp.achievements.push(polished);
        }
      } else {
        // Fallback first job
        currentExp = {
          id: `parsed-exp-${Date.now()}`,
          role: line,
          company: 'Empresa',
          location: 'Remoto',
          startDate: '2022',
          endDate: 'Presente',
          isCurrent: true,
          employmentType: 'Tiempo Completo',
          achievements: [],
          technologies: []
        };
      }
    }

    if (currentExp && currentExp.role) {
      newExperiences.push(completeExp(currentExp));
    }

    if (newExperiences.length > 0) {
      result.experience = newExperiences;
    }
  }

  // Parse Education
  if (sectionContents.EDUCATION.length > 0) {
    const eduLines = sectionContents.EDUCATION;
    const newEducation: EducationItem[] = [];

    for (const line of eduLines) {
      if (line.trim().length === 0) continue;
      const parts = line.split(/[|–—\-,]/).map(p => p.trim());
      const degree = parts[0] || line;
      const institution = parts[1] || 'Universidad / Institución';
      const dates = parts.length > 2 ? parts[2] : '2018 - 2022';

      newEducation.push({
        id: `parsed-edu-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`,
        degree,
        institution,
        location: 'España / Internacional',
        startDate: dates.includes('-') ? dates.split('-')[0].trim() : '2018',
        endDate: dates.includes('-') ? dates.split('-')[1].trim() : '2022',
        details: parts.length > 3 ? parts.slice(3).join(', ') : 'Formación superior orientada a especialización profesional.'
      });
    }

    if (newEducation.length > 0) {
      result.education = newEducation;
    }
  }

  // Parse Certifications
  if (sectionContents.CERTIFICATIONS.length > 0) {
    const certLines = sectionContents.CERTIFICATIONS;
    const newCerts: CertificationItem[] = [];

    for (const line of certLines) {
      const clean = line.replace(/^[-•*▪▫–—]\s*/, '').trim();
      if (!clean) continue;
      const parts = clean.split(/[|–—\-,]/).map(p => p.trim());

      newCerts.push({
        id: `parsed-cert-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`,
        name: parts[0] || clean,
        issuer: parts[1] || 'Institución Emisora',
        issueDate: parts.length > 2 ? parts[2] : '2023',
        credentialUrl: 'https://credentials.example.com'
      });
    }

    if (newCerts.length > 0) {
      result.certifications = newCerts;
    }
  }

  // Parse Skills
  if (sectionContents.SKILLS.length > 0) {
    const allSkillTokens: string[] = [];
    for (const line of sectionContents.SKILLS) {
      const tokens = line.split(/[,;|•·\n]/).map(t => t.replace(/^[-*▪▫]\s*/, '').trim()).filter(Boolean);
      allSkillTokens.push(...tokens);
    }

    if (allSkillTokens.length > 0) {
      const uniqueSkills = Array.from(new Set(allSkillTokens));
      result.skillCategories = [
        {
          id: 'parsed-cat-1',
          categoryName: 'Habilidades & Tecnologías',
          skills: uniqueSkills.map(name => ({
            name,
            level: 'Avanzado',
            percent: 85
          }))
        }
      ];
    }
  }

  // Parse Languages
  if (sectionContents.LANGUAGES.length > 0) {
    const langLines = sectionContents.LANGUAGES;
    const newLangs: LanguageItem[] = [];

    for (const line of langLines) {
      const tokens = line.split(/[,;|•·\n]/).map(t => t.replace(/^[-*▪▫]\s*/, '').trim()).filter(Boolean);
      for (const token of tokens) {
        const parts = token.split(/[:\-\(]/).map(p => p.replace(/\)/, '').trim());
        const langName = parts[0];
        const prof = (parts[1] || 'Profesional Avanzado (C1)') as LanguageItem['proficiency'];
        newLangs.push({
          id: `parsed-lang-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`,
          language: langName,
          proficiency: prof
        });
      }
    }

    if (newLangs.length > 0) {
      result.languages = newLangs;
    }
  }

  return result;
}

function completeExp(partial: Partial<ExperienceItem>): ExperienceItem {
  return {
    id: partial.id || `exp-${Date.now()}`,
    role: partial.role || 'Puesto Profesional',
    company: partial.company || 'Empresa',
    location: partial.location || 'Remoto',
    startDate: partial.startDate || '2022',
    endDate: partial.endDate || 'Presente',
    isCurrent: partial.isCurrent ?? true,
    employmentType: partial.employmentType || 'Tiempo Completo',
    summary: partial.summary || '',
    achievements: partial.achievements && partial.achievements.length > 0
      ? partial.achievements
      : ['Lideró proyectos estratégicos entregando resultados de alto impacto dentro de los plazos establecidos.'],
    technologies: partial.technologies || []
  };
}
