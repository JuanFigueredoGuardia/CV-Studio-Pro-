/**
 * CV STUDIO PRO - JAVASCRIPT VANILLA ENGINE
 * Motor de Generación, Edición y Mejora Automática de CVs
 * 100% Nativo, Ultra-Responsivo y Sin Dependencias Externas de Servidor
 */

// 1. BANCO DE VERBOS DE ACCIÓN PROFESIONALES (RECLUTADOR SENIOR)
const ACTION_VERBS = [
  'Lideró', 'Arquitectó', 'Diseñó', 'Implementó', 'Optimizó', 'Escaló',
  'Automatizó', 'Redujo', 'Incrementó', 'Desplegó', 'Coordinó', 'Gestionó',
  'Consolidó', 'Transformó', 'Estandarizó', 'Refactorizó', 'Mentoreó'
];

const VERB_REPLACEMENTS = [
  [/^(?:fui\s+responsable\s+de|era\s+el\s+encargado\s+de|me\s+encargaba\s+de|encargado\s+de)\s+(?:crear|hacer|desarrollar)\b/i, 'Desarrolló e implementó'],
  [/^(?:fui\s+responsable\s+de|era\s+el\s+encargado\s+de|me\s+encargaba\s+de|encargado\s+de)\s+(?:optimizar|mejorar)\b/i, 'Optimizó y mejoró'],
  [/^(?:fui\s+responsable\s+de|era\s+el\s+encargado\s+de|me\s+encargaba\s+de|encargado\s+de)\s+(?:liderar|manejar|dirigir)\b/i, 'Lideró y gestionó'],
  [/^(?:fui\s+responsable\s+de|responsable\s+de|me\s+tocó)\s+/i, 'Lideró '],
  [/^(?:trabajé\s+en|trabajaba\s+en|participé\s+en)\s+(?:el\s+desarrollo\s+de|la\s+creación\s+de)/i, 'Diseñó y construyó'],
  [/^(?:hice|realicé|hicimos)\s+/i, 'Implementó '],
  [/^(?:ayudé\s+a|apoyé\s+en)\s+/i, 'Colaboró activamente en '],
  [/^(?:creé|crear)\s+/i, 'Diseñó y desplegó '],
  [/^(?:migré|migrar)\s+/i, 'Arquitectó la migración de '],
  [/^(?:resolví|arreglé)\s+/i, 'Solucionó y mitigó ']
];

// 2. ESTADO GLOBAL DEL CURRÍCULUM
let cvData = {
  profile: {
    name: 'Juan Carlos Figueredo',
    targetRole: 'Senior Full-Stack & Cloud Solutions Lead',
    bio: 'Ingeniero de Software Senior con más de 8 años de trayectoria diseñando y escalando arquitecturas cloud nativas de alto rendimiento. Especializado en React, TypeScript, Node.js y plataformas AWS/GCP con enfoque en observabilidad y entrega continua.',
    email: 'juanfigueredoguardia@gmail.com',
    phone: '+34 612 345 678',
    location: 'Madrid, España (Disponible Remoto)',
    website: 'https://juanfigueredo.dev',
    linkedin: 'https://linkedin.com/in/juan-figueredo',
    github: 'https://github.com/juanfigueredo',
    photoUrl: '/src/assets/images/avatar_tech_lead_1792986076800.jpg',
    showPhoto: true
  },
  experience: [
    {
      id: 'exp-1',
      role: 'Tech Lead & Senior Software Architect',
      company: 'Novatech Enterprise Systems',
      location: 'Madrid, España',
      startDate: '2023 - 03',
      endDate: 'Presente',
      employmentType: 'Tiempo Completo',
      summary: 'Liderazgo técnico de un equipo distribuido de 12 ingenieros en la modernización de servicios bancarios.',
      achievements: [
        'Arquitectó la migración a microfrontends React/TypeScript, reduciendo el tiempo de carga en un 44% para 1.8M de usuarios activos mensuales.',
        'Optimizó pipelines CI/CD con Kubernetes y Docker, reduciendo incidentes en producción en un 60% y acelerando releases.',
        'Implementó observabilidad con OpenTelemetry, elevando el SLA de disponibilidad al 99.98% en servicios de alta concurrencia.'
      ],
      technologies: ['React', 'TypeScript', 'Node.js', 'Kubernetes', 'PostgreSQL', 'AWS']
    },
    {
      id: 'exp-2',
      role: 'Senior Full-Stack Developer',
      company: 'Global Fintech Ventures',
      location: 'Barcelona, España (Remoto)',
      startDate: '2020 - 06',
      endDate: '2023 - 02',
      employmentType: 'Remoto',
      summary: 'Desarrollo de módulos de pagos y conciliación bancaria.',
      achievements: [
        'Diseñó e implementó microservicios con Kafka y Redis procesando 150,000 transacciones diarias con latencia p99 inferior a 80ms.',
        'Desarrolló el portal corporativo financiero incrementando el Net Promoter Score (NPS) en 28 puntos.'
      ],
      technologies: ['React', 'Express', 'Kafka', 'Redis', 'Docker']
    }
  ],
  education: [
    {
      id: 'edu-1',
      degree: 'Grado en Ingeniería Informática del Software',
      institution: 'Universidad Politécnica de Madrid',
      startDate: '2013',
      endDate: '2017',
      details: 'Matrícula de Honor en Proyecto de Fin de Grado en Sistemas Distribuidos.'
    },
    {
      id: 'edu-2',
      degree: 'Máster en Cloud Computing & Arquitectura',
      institution: 'Tech Institute / URJC',
      startDate: '2018',
      endDate: '2019',
      details: 'Especialización en microservicios, serverless y diseño guiado por el dominio (DDD).'
    }
  ],
  certifications: [
    {
      id: 'cert-1',
      name: 'AWS Solutions Architect Professional',
      issuer: 'Amazon Web Services',
      issueDate: '2024',
      credentialUrl: 'https://aws.amazon.com/verification'
    },
    {
      id: 'cert-2',
      name: 'Certified Kubernetes Administrator (CKA)',
      issuer: 'CNCF',
      issueDate: '2023',
      credentialUrl: 'https://www.cncf.io'
    }
  ],
  skillCategories: [
    {
      id: 'cat-1',
      categoryName: 'Frontend & UI Engineering',
      skills: [
        { name: 'React & TypeScript', level: 'Experto', percent: 95 },
        { name: 'Tailwind CSS & Design Systems', level: 'Experto', percent: 90 },
        { name: 'Accesibilidad Web (WCAG AAA)', level: 'Avanzado', percent: 85 }
      ]
    },
    {
      id: 'cat-2',
      categoryName: 'Backend & Cloud Infrastructure',
      skills: [
        { name: 'Node.js & Express / NestJS', level: 'Experto', percent: 92 },
        { name: 'AWS & Kubernetes', level: 'Avanzado', percent: 88 },
        { name: 'PostgreSQL & Redis', level: 'Avanzado', percent: 85 }
      ]
    }
  ],
  languages: [
    { language: 'Español', proficiency: 'Nativo' },
    { language: 'Inglés', proficiency: 'Profesional Avanzado (C1)' }
  ],
  projects: [
    {
      name: 'OmniStream Cloud Gateway',
      description: 'Gateway de microservicios con balanceo inteligente de tráfico y rate-limiting distribuido.',
      impactMetric: 'Reduce latencia p99 en 35%',
      liveUrl: 'https://github.com/juanfigueredo'
    }
  ],
  settings: {
    theme: 'slate',
    layout: 'two-column',
    sidebarStyle: 'dark'
  }
};

// 3. MEJORADOR DE TEXTO CON VERBOS DE ACCIÓN
function polishTextWithActionVerb(text) {
  let cleaned = text.trim().replace(/^[-•*▪▫–—\d\.]\s*/, '').trim();
  for (const [regex, replacement] of VERB_REPLACEMENTS) {
    if (regex.test(cleaned)) {
      cleaned = cleaned.replace(regex, replacement);
      break;
    }
  }

  // Si no empieza con un verbo de acción fuerte, agregar uno apropiado
  const hasStrongVerb = ACTION_VERBS.some(v => new RegExp(`^${v}\\b`, 'i').test(cleaned));
  if (!hasStrongVerb && cleaned.length > 5) {
    cleaned = 'Lideró la ejecución de ' + cleaned.charAt(0).toLowerCase() + cleaned.slice(1);
  }

  if (cleaned.length > 0) {
    cleaned = cleaned.charAt(0).toUpperCase() + cleaned.slice(1);
    if (!cleaned.endsWith('.')) cleaned += '.';
  }
  return cleaned;
}

// 4. RENDERIZADOR DE CV EN PANTALLA (HTML5 Semántico)
function renderCV() {
  const container = document.getElementById('cv-printable-area') || document.getElementById('cv-document');
  if (!container) return;

  const { profile, experience, education, certifications, skillCategories, languages, projects, settings } = cvData;

  container.setAttribute('data-theme', settings.theme);
  container.setAttribute('data-sidebar', settings.sidebarStyle);
  if (settings.layout === 'two-column') {
    container.classList.add('two-column-layout');
  } else {
    container.classList.remove('two-column-layout');
  }

  // Sidebar HTML
  const photoHtml = profile.showPhoto && profile.photoUrl
    ? `<div class="cv-photo-wrapper">
        <img src="${profile.photoUrl}" alt="${profile.name}" class="cv-photo" />
      </div>`
    : '';

  const contactHtml = [
    profile.email ? `<li>📧 <a href="mailto:${profile.email}">${profile.email}</a></li>` : '',
    profile.phone ? `<li>📱 <span>${profile.phone}</span></li>` : '',
    profile.location ? `<li>📍 <span>${profile.location}</span></li>` : '',
    profile.linkedin ? `<li>💼 <a href="${profile.linkedin}" target="_blank">${profile.linkedin.replace(/^https?:\/\/(www\.)?linkedin\.com\/in\//, '')}</a></li>` : '',
    profile.github ? `<li>💻 <a href="${profile.github}" target="_blank">${profile.github.replace(/^https?:\/\/(www\.)?github\.com\//, '')}</a></li>` : '',
    profile.website ? `<li>🌐 <a href="${profile.website}" target="_blank">${profile.website.replace(/^https?:\/\//, '')}</a></li>` : ''
  ].filter(Boolean).join('');

  const skillsHtml = skillCategories.map(cat => `
    <div class="skill-group">
      <div class="skill-group-name">${cat.categoryName}</div>
      ${cat.skills.map(s => `
        <div class="skill-bar-row">
          <div class="skill-bar-header">
            <span>${s.name}</span>
            <span style="opacity: 0.7; font-size: 10px;">${s.level}</span>
          </div>
          <div class="skill-bar-track">
            <div class="skill-bar-fill" style="width: ${s.percent || 80}%;"></div>
          </div>
        </div>
      `).join('')}
    </div>
  `).join('');

  const certsHtml = certifications.map(c => `
    <div style="margin-bottom: 8px;">
      <div style="font-weight: 600;">${c.name}</div>
      <div style="font-size: 10.5px; opacity: 0.7;">${c.issuer} · ${c.issueDate}</div>
      ${c.credentialUrl ? `<a href="${c.credentialUrl}" target="_blank" style="font-size: 10px; color: #60a5fa;">Verificar &rarr;</a>` : ''}
    </div>
  `).join('');

  const langsHtml = languages.map(l => `
    <li style="display: flex; justify-content: space-between; margin-bottom: 4px;">
      <span>${l.language}</span>
      <span style="opacity: 0.7;">${l.proficiency}</span>
    </li>
  `).join('');

  // Main Section HTML
  const expHtml = experience.map(exp => `
    <div class="timeline-entry page-break-avoid">
      <div class="entry-header">
        <div style="display: flex; align-items: center; gap: 6px; flex-wrap: wrap;">
          <span class="role-icon-badge" aria-hidden="true">
            <svg class="role-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
              <rect width="20" height="14" x="2" y="7" rx="2" ry="2"/>
              <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/>
            </svg>
          </span>
          <span class="entry-role">${exp.role}</span>
          <span style="color: #cbd5e1; margin: 0 4px;">·</span>
          <span class="entry-company">${exp.company}</span>
        </div>
        <span class="entry-dates">${exp.startDate} — ${exp.endDate}</span>
      </div>
      <div style="font-size: 11px; color: #64748b; margin-top: 1px;">${exp.location} · ${exp.employmentType}</div>
      ${exp.summary ? `<div class="entry-summary">${exp.summary}</div>` : ''}
      <ul class="entry-bullets">
        ${exp.achievements.map(a => `<li>${a}</li>`).join('')}
      </ul>
      ${exp.technologies && exp.technologies.length > 0 ? `
        <div class="tech-tags">
          ${exp.technologies.map(t => `<span class="tech-tag">${t}</span>`).join('')}
        </div>
      ` : ''}
    </div>
  `).join('');

  const eduHtml = education.map(edu => `
    <div class="edu-row page-break-avoid">
      <div style="display: flex; justify-content: space-between; align-items: baseline;">
        <span class="edu-degree">${edu.degree}</span>
        <span style="font-size: 11px; font-weight: 600; color: #64748b;">${edu.startDate} — ${edu.endDate}</span>
      </div>
      <div class="edu-school">${edu.institution}</div>
      ${edu.details ? `<div style="font-size: 11.5px; color: #475569; margin-top: 2px;">${edu.details}</div>` : ''}
    </div>
  `).join('');

  const projHtml = projects.map(p => `
    <div style="background: #f8fafc; border: 1px solid var(--cv-border); border-radius: 8px; padding: 10px; margin-bottom: 8px;" class="page-break-avoid">
      <div style="display: flex; justify-content: space-between; font-weight: 700; font-size: 12.5px;">
        <span>${p.name}</span>
        ${p.liveUrl ? `<a href="${p.liveUrl}" target="_blank" style="color: var(--cv-accent); font-size: 11px; text-decoration: none;">Ver ↗</a>` : ''}
      </div>
      <p style="font-size: 11.5px; color: #475569; margin: 3px 0;">${p.description}</p>
      ${p.impactMetric ? `<span style="font-size: 10.5px; font-weight: 600; color: #047857; background: #ecfdf5; padding: 2px 6px; border-radius: 4px;">${p.impactMetric}</span>` : ''}
    </div>
  `).join('');

  container.innerHTML = `
    <!-- ASIDE (Sidebar) -->
    <aside class="cv-sidebar cv-animated-section">
      ${photoHtml}
      <section class="cv-animated-section">
        <h3 class="sidebar-title">Contacto</h3>
        <ul class="sidebar-list">
          ${contactHtml}
        </ul>
      </section>

      ${skillCategories.length > 0 ? `
        <section class="page-break-avoid cv-animated-section">
          <h3 class="sidebar-title">Habilidades & Stack</h3>
          ${skillsHtml}
        </section>
      ` : ''}

      ${certifications.length > 0 ? `
        <section class="page-break-avoid cv-animated-section">
          <h3 class="sidebar-title">Certificaciones</h3>
          ${certsHtml}
        </section>
      ` : ''}

      ${languages.length > 0 ? `
        <section class="page-break-avoid cv-animated-section">
          <h3 class="sidebar-title">Idiomas</h3>
          <ul style="list-style: none; font-size: 11.5px;">
            ${langsHtml}
          </ul>
        </section>
      ` : ''}
    </aside>

    <!-- MAIN (Contenido Principal) -->
    <main class="cv-main cv-animated-section">
      <header class="cv-header-title cv-animated-section">
        <h1 class="cv-name">${profile.name}</h1>
        <div class="cv-role">${profile.targetRole}</div>
      </header>

      ${profile.bio ? `
        <section class="page-break-avoid cv-animated-section">
          <h2 class="main-section-title">
            <svg class="section-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
            <span>Perfil Profesional</span>
          </h2>
          <p class="cv-bio">${profile.bio}</p>
        </section>
      ` : ''}

      ${experience.length > 0 ? `
        <section class="cv-animated-section">
          <h2 class="main-section-title">
            <svg class="section-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><rect width="20" height="14" x="2" y="7" rx="2" ry="2"/><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/></svg>
            <span>Experiencia Laboral</span>
          </h2>
          <div>
            ${expHtml}
          </div>
        </section>
      ` : ''}

      ${education.length > 0 ? `
        <section class="page-break-avoid cv-animated-section">
          <h2 class="main-section-title">
            <svg class="section-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 10v6M2 10l10-5 10 5-10 5z"/><path d="M6 12v5c3 3 9 3 12 0v-5"/></svg>
            <span>Educación</span>
          </h2>
          ${eduHtml}
        </section>
      ` : ''}

      ${projects.length > 0 ? `
        <section class="page-break-avoid cv-animated-section">
          <h2 class="main-section-title">
            <svg class="section-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><polygon points="12 2 2 7 12 12 22 7 12 2"/><polyline points="2 17 12 22 22 17"/><polyline points="2 12 12 17 22 12"/></svg>
            <span>Proyectos Destacados</span>
          </h2>
          <div>
            ${projHtml}
          </div>
        </section>
      ` : ''}
    </main>
  `;

  updateAtsAudit();
}

// 5. LLENAR FORMULARIO EDITOR
function populateEditor() {
  const p = cvData.profile;
  const setVal = (id, val) => {
    const el = document.getElementById(id);
    if (el) el.value = val || '';
  };

  setVal('input-name', p.name);
  setVal('input-role', p.targetRole);
  setVal('input-email', p.email);
  setVal('input-phone', p.phone);
  setVal('input-location', p.location);
  setVal('input-linkedin', p.linkedin);
  setVal('input-github', p.github);
  setVal('input-website', p.website);
  setVal('input-bio', p.bio);

  const photoCheck = document.getElementById('input-show-photo');
  if (photoCheck) photoCheck.checked = p.showPhoto;

  renderExperienceEditor();
  renderEducationEditor();
  renderSkillsEditor();
  renderCertificationsEditor();
}

function renderExperienceEditor() {
  const list = document.getElementById('editor-exp-list');
  if (!list) return;

  list.innerHTML = cvData.experience.map((exp, idx) => `
    <div class="item-card">
      <div class="item-card-header">
        <strong style="font-size: 11px; text-transform: uppercase; color: #64748b;">Empleo #${idx + 1}</strong>
        <button type="button" class="delete-btn" onclick="removeExperience(${idx})">🗑️</button>
      </div>
      <div class="form-grid-2">
        <div class="form-group">
          <label class="form-label">Cargo</label>
          <input type="text" class="form-input" value="${exp.role}" oninput="updateExpField(${idx}, 'role', this.value)">
        </div>
        <div class="form-group">
          <label class="form-label">Empresa</label>
          <input type="text" class="form-input" value="${exp.company}" oninput="updateExpField(${idx}, 'company', this.value)">
        </div>
        <div class="form-group">
          <label class="form-label">Inicio</label>
          <input type="text" class="form-input" value="${exp.startDate}" oninput="updateExpField(${idx}, 'startDate', this.value)">
        </div>
        <div class="form-group">
          <label class="form-label">Fin</label>
          <input type="text" class="form-input" value="${exp.endDate}" oninput="updateExpField(${idx}, 'endDate', this.value)">
        </div>
      </div>

      <div class="form-group">
        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 4px;">
          <label class="form-label" style="margin: 0;">Logros / Puntos Clave</label>
          <button type="button" class="btn btn-secondary" style="padding: 2px 6px; font-size: 10px;" onclick="addBullet(${idx})">+ Viñeta</button>
        </div>
        ${exp.achievements.map((ach, bIdx) => `
          <div style="display: flex; gap: 4px; margin-bottom: 4px;">
            <input type="text" class="form-input" value="${ach}" oninput="updateBullet(${idx}, ${bIdx}, this.value)" style="font-size: 11px;">
            <button type="button" class="btn btn-blue" style="padding: 2px 6px; font-size: 10px;" title="Pulir con verbo de acción" onclick="polishBullet(${idx}, ${bIdx})">✨</button>
            <button type="button" class="delete-btn" onclick="removeBullet(${idx}, ${bIdx})">✕</button>
          </div>
        `).join('')}
      </div>

      <div class="form-group" style="margin-bottom: 0;">
        <label class="form-label">Tecnologías (separadas por coma)</label>
        <input type="text" class="form-input" value="${exp.technologies ? exp.technologies.join(', ') : ''}" oninput="updateExpTech(${idx}, this.value)">
      </div>
    </div>
  `).join('');
}

function renderEducationEditor() {
  const list = document.getElementById('editor-edu-list');
  if (!list) return;

  list.innerHTML = cvData.education.map((edu, idx) => `
    <div class="item-card">
      <div class="item-card-header">
        <strong style="font-size: 11px; text-transform: uppercase; color: #64748b;">Estudio #${idx + 1}</strong>
        <button type="button" class="delete-btn" onclick="removeEducation(${idx})">🗑️</button>
      </div>
      <div class="form-grid-2">
        <div class="form-group">
          <label class="form-label">Título / Grado</label>
          <input type="text" class="form-input" value="${edu.degree}" oninput="updateEduField(${idx}, 'degree', this.value)">
        </div>
        <div class="form-group">
          <label class="form-label">Institución</label>
          <input type="text" class="form-input" value="${edu.institution}" oninput="updateEduField(${idx}, 'institution', this.value)">
        </div>
        <div class="form-group">
          <label class="form-label">Inicio</label>
          <input type="text" class="form-input" value="${edu.startDate}" oninput="updateEduField(${idx}, 'startDate', this.value)">
        </div>
        <div class="form-group">
          <label class="form-label">Fin</label>
          <input type="text" class="form-input" value="${edu.endDate}" oninput="updateEduField(${idx}, 'endDate', this.value)">
        </div>
      </div>
    </div>
  `).join('');
}

function renderSkillsEditor() {
  const list = document.getElementById('editor-skills-list');
  if (!list) return;

  list.innerHTML = cvData.skillCategories.map((cat, cIdx) => `
    <div class="item-card">
      <div class="item-card-header">
        <input type="text" class="form-input" value="${cat.categoryName}" style="font-weight: 700; width: 80%;" oninput="updateCatName(${cIdx}, this.value)">
        <button type="button" class="delete-btn" onclick="removeCategory(${cIdx})">🗑️</button>
      </div>
      ${cat.skills.map((s, sIdx) => `
        <div style="display: flex; gap: 4px; margin-bottom: 4px;">
          <input type="text" class="form-input" value="${s.name}" oninput="updateSkillName(${cIdx}, ${sIdx}, this.value)">
          <select class="form-select" style="width: 100px;" onchange="updateSkillLevel(${cIdx}, ${sIdx}, this.value)">
            <option value="Experto" ${s.level === 'Experto' ? 'selected' : ''}>Experto</option>
            <option value="Avanzado" ${s.level === 'Avanzado' ? 'selected' : ''}>Avanzado</option>
            <option value="Intermedio" ${s.level === 'Intermedio' ? 'selected' : ''}>Intermedio</option>
          </select>
          <button type="button" class="delete-btn" onclick="removeSkill(${cIdx}, ${sIdx})">✕</button>
        </div>
      `).join('')}
      <button type="button" class="btn btn-secondary" style="padding: 3px 8px; font-size: 10.5px; margin-top: 4px;" onclick="addSkill(${cIdx})">+ Añadir Habilidad</button>
    </div>
  `).join('');
}

function renderCertificationsEditor() {
  const list = document.getElementById('editor-certs-list');
  if (!list) return;

  list.innerHTML = cvData.certifications.map((c, idx) => `
    <div class="item-card">
      <div class="item-card-header">
        <strong style="font-size: 11px; text-transform: uppercase; color: #64748b;">Certificación #${idx + 1}</strong>
        <button type="button" class="delete-btn" onclick="removeCert(${idx})">🗑️</button>
      </div>
      <div class="form-group">
        <label class="form-label">Nombre Certificado</label>
        <input type="text" class="form-input" value="${c.name}" oninput="updateCertField(${idx}, 'name', this.value)">
      </div>
      <div class="form-grid-2">
        <div class="form-group">
          <label class="form-label">Emisor</label>
          <input type="text" class="form-input" value="${c.issuer}" oninput="updateCertField(${idx}, 'issuer', this.value)">
        </div>
        <div class="form-group">
          <label class="form-label">Año</label>
          <input type="text" class="form-input" value="${c.issueDate}" oninput="updateCertField(${idx}, 'issueDate', this.value)">
        </div>
      </div>
    </div>
  `).join('');
}

// 6. ACCIONES Y LISTENERS DE MUTACIÓN
window.updateProfileField = function(field, val) {
  cvData.profile[field] = val;
  renderCV();
};

window.handlePhotoUpload = function(event) {
  const file = event.target.files[0];
  if (file) {
    const reader = new FileReader();
    reader.onload = function(e) {
      cvData.profile.photoUrl = e.target.result;
      cvData.profile.showPhoto = true;
      const chk = document.getElementById('input-show-photo');
      if (chk) chk.checked = true;
      renderCV();
    };
    reader.readAsDataURL(file);
  }
};

window.setPresetPhoto = function(url) {
  cvData.profile.photoUrl = url;
  cvData.profile.showPhoto = true;
  const chk = document.getElementById('input-show-photo');
  if (chk) chk.checked = true;
  renderCV();
};

window.updateExpField = function(idx, field, val) {
  cvData.experience[idx][field] = val;
  renderCV();
};

window.updateExpTech = function(idx, val) {
  cvData.experience[idx].technologies = val.split(',').map(s => s.trim()).filter(Boolean);
  renderCV();
};

window.updateBullet = function(expIdx, bulletIdx, val) {
  cvData.experience[expIdx].achievements[bulletIdx] = val;
  renderCV();
};

window.polishBullet = function(expIdx, bulletIdx) {
  const current = cvData.experience[expIdx].achievements[bulletIdx];
  const polished = polishTextWithActionVerb(current);
  cvData.experience[expIdx].achievements[bulletIdx] = polished;
  renderExperienceEditor();
  renderCV();
};

window.addBullet = function(expIdx) {
  cvData.experience[expIdx].achievements.push('Lideró la optimización de procesos clave reduciendo tiempos de respuesta en 25%.');
  renderExperienceEditor();
  renderCV();
};

window.removeBullet = function(expIdx, bulletIdx) {
  cvData.experience[expIdx].achievements.splice(bulletIdx, 1);
  renderExperienceEditor();
  renderCV();
};

window.addExperience = function() {
  cvData.experience.unshift({
    id: 'exp-' + Date.now(),
    role: 'Nuevo Cargo',
    company: 'Empresa',
    location: 'Remoto',
    startDate: '2023',
    endDate: 'Presente',
    employmentType: 'Tiempo Completo',
    achievements: ['Diseñó e implementó soluciones técnicas de alto impacto aumentando la eficiencia en 30%.'],
    technologies: ['React', 'TypeScript']
  });
  renderExperienceEditor();
  renderCV();
};

window.removeExperience = function(idx) {
  cvData.experience.splice(idx, 1);
  renderExperienceEditor();
  renderCV();
};

window.addEducation = function() {
  cvData.education.push({
    id: 'edu-' + Date.now(),
    degree: 'Nueva Titulación',
    institution: 'Universidad',
    startDate: '2019',
    endDate: '2023'
  });
  renderEducationEditor();
  renderCV();
};

window.removeEducation = function(idx) {
  cvData.education.splice(idx, 1);
  renderEducationEditor();
  renderCV();
};

window.updateEduField = function(idx, field, val) {
  cvData.education[idx][field] = val;
  renderCV();
};

window.updateCatName = function(idx, val) {
  cvData.skillCategories[idx].categoryName = val;
  renderCV();
};

window.updateSkillName = function(cIdx, sIdx, val) {
  cvData.skillCategories[cIdx].skills[sIdx].name = val;
  renderCV();
};

window.updateSkillLevel = function(cIdx, sIdx, val) {
  const pctMap = { 'Experto': 95, 'Avanzado': 85, 'Intermedio': 70 };
  cvData.skillCategories[cIdx].skills[sIdx].level = val;
  cvData.skillCategories[cIdx].skills[sIdx].percent = pctMap[val] || 80;
  renderCV();
};

window.addSkill = function(cIdx) {
  cvData.skillCategories[cIdx].skills.push({ name: 'Nueva Tecnología', level: 'Avanzado', percent: 85 });
  renderSkillsEditor();
  renderCV();
};

window.removeSkill = function(cIdx, sIdx) {
  cvData.skillCategories[cIdx].skills.splice(sIdx, 1);
  renderSkillsEditor();
  renderCV();
};

window.removeCategory = function(cIdx) {
  cvData.skillCategories.splice(cIdx, 1);
  renderSkillsEditor();
  renderCV();
};

window.addCertification = function() {
  cvData.certifications.push({
    id: 'cert-' + Date.now(),
    name: 'Certificación Oficial',
    issuer: 'Entidad Emisora',
    issueDate: '2024'
  });
  renderCertificationsEditor();
  renderCV();
};

window.removeCert = function(idx) {
  cvData.certifications.splice(idx, 1);
  renderCertificationsEditor();
  renderCV();
};

window.updateCertField = function(idx, field, val) {
  cvData.certifications[idx][field] = val;
  renderCV();
};

// 7. SUBIDA Y MEJORA DE CV ANTIGUO (ARCHIVOS .TXT, .MD, .JSON, .PDF, ETC.)
window.handleOldCvFile = function(event) {
  const file = event.target.files[0];
  if (!file) return;
  readAndEnhanceOldCv(file);
};

window.handleOldCvDrop = function(event) {
  event.preventDefault();
  const dropzone = document.getElementById('cv-dropzone');
  if (dropzone) dropzone.classList.remove('dragover');

  const file = event.dataTransfer?.files[0];
  if (file) {
    readAndEnhanceOldCv(file);
  }
};

window.handleDragOver = function(event) {
  event.preventDefault();
  const dropzone = document.getElementById('cv-dropzone');
  if (dropzone) dropzone.classList.add('dragover');
};

window.handleDragLeave = function(event) {
  const dropzone = document.getElementById('cv-dropzone');
  if (dropzone) dropzone.classList.remove('dragover');
};

function readAndEnhanceOldCv(file) {
  const statusEl = document.getElementById('upload-status-msg');
  if (statusEl) {
    statusEl.innerText = `Leyendo "${file.name}" y optimizando con verbos de acción...`;
    statusEl.style.display = 'block';
  }

  // Si es JSON estructurado
  if (file.name.endsWith('.json')) {
    const reader = new FileReader();
    reader.onload = function(e) {
      try {
        const parsed = JSON.parse(e.target.result);
        cvData = Object.assign(cvData, parsed);
        populateEditor();
        renderCV();
        closeModal('modal-upload-cv');
        showSuccessNotification('¡CV antiguo importado y formateado con éxito!');
      } catch (err) {
        alert('Error al leer el archivo JSON.');
      }
    };
    reader.readAsText(file);
    return;
  }

  // Para texto (.txt, .md, o cualquier archivo de texto plano o exportado)
  const reader = new FileReader();
  reader.onload = function(e) {
    const rawText = e.target.result;
    enhanceAndApplyCvText(rawText);
    closeModal('modal-upload-cv');
  };
  reader.readAsText(file);
}

window.enhancePastedOldCv = function() {
  const text = document.getElementById('old-cv-textarea').value;
  if (!text || !text.trim()) {
    alert('Por favor pega el texto de tu CV antiguo.');
    return;
  }
  enhanceAndApplyCvText(text);
  closeModal('modal-upload-cv');
};

function enhanceAndApplyCvText(rawText) {
  const lines = rawText.split('\n').map(l => l.trim()).filter(Boolean);
  if (lines.length === 0) return;

  // 1. Extraer contacto básico
  const emailMatch = rawText.match(/([a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,})/);
  if (emailMatch) cvData.profile.email = emailMatch[1];

  const phoneMatch = rawText.match(/(?:\+?\d{1,3}[-.\s]?)?\(?\d{2,4}\)?[-.\s]?\d{3,4}[-.\s]?\d{3,4}/);
  if (phoneMatch && phoneMatch[0].replace(/\D/g, '').length >= 8) cvData.profile.phone = phoneMatch[0];

  const linkedinMatch = rawText.match(/(https?:\/\/(?:www\.)?linkedin\.com\/in\/[^\s]+)/i);
  if (linkedinMatch) cvData.profile.linkedin = linkedinMatch[1];

  const githubMatch = rawText.match(/(https?:\/\/(?:www\.)?github\.com\/[^\s]+)/i);
  if (githubMatch) cvData.profile.github = githubMatch[1];

  // 2. Extraer nombre y rol del encabezado
  if (lines.length > 0 && !lines[0].includes('@') && !lines[0].includes('http')) {
    cvData.profile.name = lines[0].replace(/^nombre:?\s*/i, '');
  }
  if (lines.length > 1 && !lines[1].includes('@') && lines[1].length < 70) {
    cvData.profile.targetRole = lines[1].replace(/^cargo:?\s*/i, '');
  }

  // 3. Detectar y mejorar viñetas con verbos de acción
  const enhancedBullets = [];
  lines.forEach(line => {
    // Si parece una viñeta o frase descriptiva
    if (/^[-•*▪▫–—\d\.]\s*/.test(line) || /responsable|trabajé|hice|diseño|desarrollo/i.test(line)) {
      if (line.length > 15) {
        enhancedBullets.push(polishTextWithActionVerb(line));
      }
    }
  });

  if (enhancedBullets.length > 0) {
    // Agrupar viñetas mejoradas en el empleo principal
    if (!cvData.experience[0]) window.addExperience();
    cvData.experience[0].achievements = enhancedBullets.slice(0, 5);
  }

  // 4. Detectar habilidades técnicas si hay lista de palabras separadas por coma
  const skillsDetected = [];
  lines.forEach(line => {
    if (line.includes(',') && (line.toLowerCase().includes('react') || line.toLowerCase().includes('python') || line.toLowerCase().includes('javascript') || line.toLowerCase().includes('sql') || line.toLowerCase().includes('aws') || line.toLowerCase().includes('figma'))) {
      const tokens = line.split(/[,;|]/).map(t => t.trim()).filter(Boolean);
      skillsDetected.push(...tokens);
    }
  });

  if (skillsDetected.length > 0) {
    cvData.skillCategories = [
      {
        id: 'cat-enhanced',
        categoryName: 'Habilidades & Tecnologías Clave',
        skills: Array.from(new Set(skillsDetected)).slice(0, 8).map(name => ({
          name,
          level: 'Avanzado',
          percent: 85
        }))
      }
    ];
  }

  populateEditor();
  renderCV();
  showSuccessNotification('✨ ¡CV Antiguo Mejorado con Éxito! Se optimizaron las viñetas con verbos de acción y se extrajeron las tecnologías.');
}

function showSuccessNotification(msg) {
  let toast = document.getElementById('app-toast');
  if (!toast) {
    toast = document.createElement('div');
    toast.id = 'app-toast';
    toast.style.cssText = 'position: fixed; bottom: 24px; left: 50%; transform: translateX(-50%); background: #0f172a; color: white; padding: 10px 20px; border-radius: 99px; font-size: 12px; font-weight: 600; z-index: 200; box-shadow: 0 10px 20px rgba(0,0,0,0.3); border: 1px solid #334155;';
    document.body.appendChild(toast);
  }
  toast.innerText = msg;
  toast.style.display = 'block';
  setTimeout(() => {
    if (toast) toast.style.display = 'none';
  }, 3500);
}

// 8. AUDITORÍA ATS (RECLUTADOR TÉCNICO)
function updateAtsAudit() {
  let score = 20;
  let actionCount = 0;
  let metricCount = 0;

  const allBullets = cvData.experience.flatMap(e => e.achievements || []);
  const metricRegex = /\b(\d+[%kKmM€$]?|\+\d+%?|\d+\s*(?:usuarios|personas|días|horas|transacciones))\b/i;

  allBullets.forEach(b => {
    if (ACTION_VERBS.some(v => b.startsWith(v))) actionCount++;
    if (metricRegex.test(b)) metricCount++;
  });

  if (cvData.profile.email && cvData.profile.phone) score += 20;
  if (cvData.profile.linkedin) score += 10;
  if (actionCount >= 3) score += 25;
  if (metricCount >= 2) score += 25;

  score = Math.min(100, score);

  const atsScoreBadge = document.getElementById('topbar-ats-score');
  if (atsScoreBadge) atsScoreBadge.innerText = score + '/100';

  const modalScore = document.getElementById('modal-ats-score');
  if (modalScore) modalScore.innerText = score;

  const modalActionCount = document.getElementById('modal-ats-actions');
  if (modalActionCount) modalActionCount.innerText = actionCount;

  const modalMetricCount = document.getElementById('modal-ats-metrics');
  if (modalMetricCount) modalMetricCount.innerText = metricCount;
}

// 9. GENERACIÓN DIRECTA A PDF CON html2pdf.js (CORREGIDO PARA EVITAR PÁGINA EN BLANCO)
window.downloadPdf = async function() {
  const source = document.getElementById('cv-printable-area') || document.getElementById('cv-document');
  if (!source) {
    console.error('No se encontró el elemento #cv-printable-area');
    window.print();
    return;
  }

  const btn = document.getElementById('btn-download-pdf');
  const originalHtml = btn ? btn.innerHTML : 'Descargar PDF';
  if (btn) {
    btn.innerHTML = '⏳ Procesando PDF...';
    btn.disabled = true;
  }

  showSuccessNotification('Generando documento PDF de alta resolución...');

  // 1. Sincronización asíncrona de tipografías web para evitar texto invisible o lienzo en blanco
  if (document.fonts && document.fonts.ready) {
    try {
      await document.fonts.ready;
    } catch (e) {
      console.warn('Tipografías cargadas:', e);
    }
  }

  // 2. Crear clon dedicado en sandbox A4 (794px = 210mm a 96DPI)
  // Esto previene que si el usuario está en móvil o con la vista previa oculta,
  // el lienzo se genere con tamaño 0x0 produciendo una hoja en blanco.
  const clone = source.cloneNode(true);
  clone.id = 'cv-pdf-export-clone';
  clone.classList.add('rendering-pdf-mode', 'two-column-layout');

  // Heredar de forma directa y explícita las variables CSS y colores computados
  const computed = window.getComputedStyle(source);
  const themeVars = [
    '--cv-accent', '--cv-accent-hover', '--cv-accent-subtle',
    '--cv-sidebar-bg', '--cv-sidebar-text', '--cv-sidebar-muted', '--cv-sidebar-border',
    '--cv-bg', '--cv-card', '--cv-border', '--cv-text-main', '--cv-text-muted', '--cv-text-light',
    '--cv-tag-bg', '--cv-tag-text', '--font-body', '--font-display'
  ];
  themeVars.forEach(v => {
    const val = computed.getPropertyValue(v);
    if (val) clone.style.setProperty(v, val);
  });

  // Asegurar estilos de fondo y color explícitos para el motor html2canvas
  const sidebar = clone.querySelector('.cv-sidebar');
  if (sidebar) {
    const sourceSidebar = source.querySelector('.cv-sidebar');
    const sbComputed = sourceSidebar ? window.getComputedStyle(sourceSidebar) : null;
    sidebar.style.backgroundColor = computed.getPropertyValue('--cv-sidebar-bg') || (sbComputed ? sbComputed.backgroundColor : '#0f172a');
    sidebar.style.color = computed.getPropertyValue('--cv-sidebar-text') || (sbComputed ? sbComputed.color : '#f8fafc');
  }

  const main = clone.querySelector('.cv-main');
  if (main) {
    main.style.backgroundColor = '#ffffff';
    main.style.color = computed.getPropertyValue('--cv-text-main') || '#0f172a';
  }

  // Desactivar animaciones y transiciones en todos los elementos del clon
  clone.querySelectorAll('*').forEach(el => {
    el.style.animation = 'none';
    el.style.transition = 'none';
  });

  // Sandbox en el DOM activo para permitir que html2canvas acceda a todas las reglas CSS
  const sandbox = document.createElement('div');
  sandbox.id = 'pdf-render-sandbox';
  sandbox.style.position = 'fixed';
  sandbox.style.left = '-9999px';
  sandbox.style.top = '0';
  sandbox.style.width = '794px';
  sandbox.style.minHeight = '1123px';
  sandbox.style.zIndex = '-9999';
  sandbox.style.background = '#ffffff';
  sandbox.appendChild(clone);
  document.body.appendChild(sandbox);

  const cleanup = function() {
    if (sandbox && sandbox.parentNode) {
      sandbox.parentNode.removeChild(sandbox);
    }
    if (btn) {
      btn.innerHTML = originalHtml;
      btn.disabled = false;
    }
  };

  const filename = `${(cvData.profile.name || 'Curriculum_Vitae').trim().replace(/[\s\W]+/g, '_')}_CV.pdf`;

  const opt = {
    margin: 0,
    filename: filename,
    image: { type: 'jpeg', quality: 0.98 },
    html2canvas: {
      scale: 2,
      useCORS: true,
      allowTaint: true,
      letterRendering: true,
      logging: false,
      scrollY: 0,
      scrollX: 0,
      width: 794,
      windowWidth: 794,
      backgroundColor: '#ffffff'
    },
    jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' },
    pagebreak: { mode: ['css', 'legacy'] }
  };

  // Breve espera para que los estilos computados del sandbox se apliquen
  await new Promise(r => setTimeout(r, 150));

  try {
    if (window.html2pdf) {
      await window.html2pdf().set(opt).from(clone).save();
      cleanup();
      showSuccessNotification('✅ ¡PDF descargado con éxito!');
    } else {
      cleanup();
      window.print();
    }
  } catch (err) {
    console.error('Error generando PDF con html2pdf:', err);
    cleanup();
    showSuccessNotification('Abriendo diálogo de impresión alternativo...');
    setTimeout(() => window.print(), 250);
  }
};

// 10. MODALES, TEMAS Y RESPONSIVE VIEW
window.openModal = function(id) {
  const m = document.getElementById(id);
  if (m) m.classList.add('active');
};

window.closeModal = function(id) {
  const m = document.getElementById(id);
  if (m) m.classList.remove('active');
};

window.setTheme = function(themeName) {
  cvData.settings.theme = themeName;
  renderCV();
};

window.setLayout = function(layout) {
  cvData.settings.layout = layout;
  renderCV();
};

window.setSidebarTone = function(tone) {
  cvData.settings.sidebarStyle = tone;
  renderCV();
};

window.switchEditorTab = function(tabId) {
  document.querySelectorAll('.editor-tab-btn').forEach(b => b.classList.remove('active'));
  document.querySelectorAll('.editor-tab-pane').forEach(p => p.style.display = 'none');
  
  const activeBtn = document.getElementById('tab-btn-' + tabId);
  const activePane = document.getElementById('tab-pane-' + tabId);
  if (activeBtn) activeBtn.classList.add('active');
  if (activePane) activePane.style.display = 'block';
};

// Control de vista móvil (Editor vs Previsualización A4)
window.switchMobileView = function(view) {
  const editorPanel = document.querySelector('.editor-panel');
  const previewWrapper = document.querySelector('.cv-preview-wrapper');
  const btnEditor = document.getElementById('btn-view-editor');
  const btnPreview = document.getElementById('btn-view-preview');

  if (view === 'editor') {
    if (editorPanel) editorPanel.style.display = 'flex';
    if (previewWrapper) previewWrapper.style.display = 'none';
    if (btnEditor) btnEditor.classList.add('active');
    if (btnPreview) btnPreview.classList.remove('active');
  } else {
    if (editorPanel) editorPanel.style.display = 'none';
    if (previewWrapper) previewWrapper.style.display = 'flex';
    if (btnEditor) btnEditor.classList.remove('active');
    if (btnPreview) btnPreview.classList.add('active');
  }
};

// Ajuste automático al cambiar tamaño de pantalla
window.addEventListener('resize', () => {
  const isDesktop = window.innerWidth >= 1024;
  const editorPanel = document.querySelector('.editor-panel');
  const previewWrapper = document.querySelector('.cv-preview-wrapper');

  if (isDesktop) {
    if (editorPanel) editorPanel.style.display = 'flex';
    if (previewWrapper) previewWrapper.style.display = 'flex';
  }
});

// Inicialización automática
document.addEventListener('DOMContentLoaded', () => {
  renderCV();
  populateEditor();
});
