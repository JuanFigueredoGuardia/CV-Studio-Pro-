import { CVData, DesignSettings } from '../types/cv';

export function generateStandaloneHtml(data: CVData, settings: DesignSettings): string {
  const { profile, experience, education, certifications, skillCategories, languages, projects } = data;

  const photoHtml = profile.showPhoto && profile.photoUrl
    ? `<div class="profile-photo-container">
        <img src="${profile.photoUrl}" alt="${profile.name}" class="profile-photo" />
      </div>`
    : '';

  const contactItemsHtml = [
    profile.email ? `<li><svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect width="20" height="16" x="2" y="4" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg><a href="mailto:${profile.email}">${profile.email}</a></li>` : '',
    profile.phone ? `<li><svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg><span>${profile.phone}</span></li>` : '',
    profile.location ? `<li><svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M20 10c0 4.993-5.539 10.193-7.399 11.799a1 1 0 0 1-1.202 0C9.539 20.193 4 14.993 4 10a8 8 0 0 1 16 0"/><circle cx="12" cy="10" r="3"/></svg><span>${profile.location}</span></li>` : '',
    profile.linkedin ? `<li><svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect width="4" height="12" x="2" y="9"/><circle cx="4" cy="4" r="2"/></svg><a href="${profile.linkedin.startsWith('http') ? profile.linkedin : 'https://' + profile.linkedin}" target="_blank">${profile.linkedin.replace(/^https?:\/\/(www\.)?linkedin\.com\/in\//, '')}</a></li>` : '',
    profile.github ? `<li><svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"/><path d="M9 18c-4.51 2-5-2-7-2"/></svg><a href="${profile.github.startsWith('http') ? profile.github : 'https://' + profile.github}" target="_blank">${profile.github.replace(/^https?:\/\/(www\.)?github\.com\//, '')}</a></li>` : '',
    profile.website ? `<li><svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20"/><path d="M2 12h20"/></svg><a href="${profile.website.startsWith('http') ? profile.website : 'https://' + profile.website}" target="_blank">${profile.website.replace(/^https?:\/\//, '')}</a></li>` : ''
  ].filter(Boolean).join('\n');

  const skillsHtml = skillCategories.map(cat => `
    <div class="skill-category">
      <h4>${cat.categoryName}</h4>
      <div class="skill-list">
        ${cat.skills.map(s => `
          <div class="skill-item">
            <div class="skill-header">
              <span>${s.name}</span>
              <span class="skill-level">${s.level}</span>
            </div>
            <div class="skill-progress-bar">
              <div class="skill-progress-fill" style="width: ${s.percent || 80}%"></div>
            </div>
          </div>
        `).join('')}
      </div>
    </div>
  `).join('');

  const certsHtml = certifications.map(c => `
    <div class="cert-item">
      <div class="cert-title">${c.name}</div>
      <div class="cert-meta">${c.issuer} · ${c.issueDate}</div>
      ${c.credentialUrl ? `<a href="${c.credentialUrl}" target="_blank" class="cert-link">Verificar credencial &rarr;</a>` : ''}
    </div>
  `).join('');

  const languagesHtml = languages.map(l => `
    <li class="lang-item">
      <span class="lang-name">${l.language}</span>
      <span class="lang-level">${l.proficiency}</span>
    </li>
  `).join('');

  const experienceHtml = experience.map(exp => `
    <div class="timeline-item page-break-avoid">
      <div class="timeline-node"></div>
      <div class="timeline-header">
        <div>
          <h3 class="role-title">${exp.role}</h3>
          <div class="company-meta">
            <span class="company-name">${exp.company}</span> ·
            <span>${exp.location}</span> ·
            <span class="emp-type">${exp.employmentType}</span>
          </div>
        </div>
        <div class="date-range">${exp.startDate} — ${exp.endDate}</div>
      </div>
      ${exp.summary ? `<p class="job-summary">${exp.summary}</p>` : ''}
      <ul class="achievements-list">
        ${exp.achievements.map(a => `<li>${a}</li>`).join('')}
      </ul>
      ${exp.technologies && exp.technologies.length > 0 ? `
        <div class="tech-stack">
          <span class="tech-label">Stack:</span>
          ${exp.technologies.map(t => `<span class="tech-badge">${t}</span>`).join('')}
        </div>
      ` : ''}
    </div>
  `).join('');

  const educationHtml = education.map(edu => `
    <div class="education-item page-break-avoid">
      <div class="edu-header">
        <h3 class="degree-title">${edu.degree}</h3>
        <span class="date-range">${edu.startDate} — ${edu.endDate}</span>
      </div>
      <div class="edu-meta">${edu.institution}${edu.location ? ` · ${edu.location}` : ''}</div>
      ${edu.honorsOrGpa ? `<div class="honors-tag">${edu.honorsOrGpa}</div>` : ''}
      ${edu.details ? `<p class="edu-details">${edu.details}</p>` : ''}
    </div>
  `).join('');

  const projectsHtml = projects.map(p => `
    <div class="project-card page-break-avoid">
      <div class="project-header">
        <h3 class="project-title">${p.name}</h3>
        ${p.liveUrl ? `<a href="${p.liveUrl}" target="_blank" class="project-link">Demo ↗</a>` : ''}
      </div>
      <p class="project-desc">${p.description}</p>
      ${p.impactMetric ? `<div class="project-metric">${p.impactMetric}</div>` : ''}
      <div class="project-tags">
        ${p.tags.map(t => `<span class="tag-pill">${t}</span>`).join('')}
      </div>
    </div>
  `).join('');

  return `<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${profile.name} - Currículum Vitae</title>
  <meta name="description" content="Currículum Vitae de ${profile.name} - ${profile.targetRole}">
  <!-- Tipografía moderna desde Google Fonts -->
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Outfit:wght@400;600;700;800&family=Plus+Jakarta+Sans:wght@300;400;500;600;700&display=swap" rel="stylesheet">
  <!-- Librería html2pdf.js para exportación directa -->
  <script src="https://cdnjs.cloudflare.com/ajax/libs/html2pdf.js/0.10.1/html2pdf.bundle.min.js"></script>

  <style>
    /* ========================================================
       VARIABLES CSS (:root) - 100% Adaptable para GitHub / Netlify
       ======================================================== */
    :root {
      --cv-bg: #f8fafc;
      --cv-card: #ffffff;
      --cv-accent: #2563eb;
      --cv-accent-hover: #1d4ed8;
      --cv-text-main: #0f172a;
      --cv-text-muted: #475569;
      --cv-border: #e2e8f0;
      --cv-sidebar-bg: #0f172a;
      --cv-sidebar-text: #f8fafc;
      --cv-sidebar-muted: #94a3b8;
      --font-body: 'Plus Jakarta Sans', system-ui, sans-serif;
      --font-display: 'Outfit', sans-serif;
    }

    * {
      box-sizing: border-box;
      margin: 0;
      padding: 0;
    }

    body {
      font-family: var(--font-body);
      color: var(--cv-text-main);
      background-color: var(--cv-bg);
      line-height: 1.5;
      padding-bottom: 60px;
    }

    /* Top Floating Action Bar */
    .action-bar {
      position: sticky;
      top: 0;
      z-index: 100;
      background: rgba(255, 255, 255, 0.95);
      backdrop-filter: blur(8px);
      border-bottom: 1px solid var(--cv-border);
      padding: 12px 24px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      gap: 16px;
    }

    .brand-title {
      font-family: var(--font-display);
      font-weight: 700;
      font-size: 1.1rem;
      color: var(--cv-text-main);
    }

    .brand-title span {
      color: var(--cv-accent);
    }

    .btn-group {
      display: flex;
      gap: 10px;
    }

    .btn {
      display: inline-flex;
      align-items: center;
      gap: 6px;
      font-family: var(--font-body);
      font-size: 13px;
      font-weight: 600;
      padding: 8px 16px;
      border-radius: 8px;
      cursor: pointer;
      border: none;
      transition: all 0.2s;
      text-decoration: none;
    }

    .btn-secondary {
      background: white;
      color: var(--cv-text-main);
      border: 1px solid var(--cv-border);
    }

    .btn-secondary:hover {
      background: #f1f5f9;
    }

    .btn-primary {
      background: var(--cv-accent);
      color: white;
    }

    .btn-primary:hover {
      background: var(--cv-accent-hover);
    }

    /* Main Sheet Container - A4 Constraints */
    .a4-container {
      max-width: 210mm;
      min-height: 297mm;
      margin: 24px auto;
      background: white;
      border: 1px solid var(--cv-border);
      box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.08);
      display: flex;
      flex-direction: row;
    }

    /* Ultra-Responsive Mobile First */
    @media (max-width: 820px) {
      .a4-container {
        flex-direction: column;
        margin: 12px;
        box-shadow: none;
      }
    }

    /* Sidebar / Aside */
    aside.cv-sidebar {
      width: 36%;
      min-width: 250px;
      background: var(--cv-sidebar-bg);
      color: var(--cv-sidebar-text);
      padding: 32px 24px;
      display: flex;
      flex-direction: column;
      gap: 24px;
    }

    @media (max-width: 820px) {
      aside.cv-sidebar {
        width: 100%;
      }
    }

    .profile-photo-container {
      text-align: center;
    }

    .profile-photo {
      width: 130px;
      height: 130px;
      border-radius: 16px;
      object-cover: cover;
      border: 3px solid rgba(255, 255, 255, 0.2);
      box-shadow: 0 4px 12px rgba(0,0,0,0.2);
    }

    .sidebar-section h3 {
      font-size: 11px;
      font-weight: 700;
      text-transform: uppercase;
      letter-spacing: 0.05em;
      color: var(--cv-sidebar-muted);
      border-bottom: 1px solid rgba(255, 255, 255, 0.15);
      padding-bottom: 6px;
      margin-bottom: 12px;
    }

    .contact-list {
      list-style: none;
      display: flex;
      flex-direction: column;
      gap: 10px;
      font-size: 12px;
    }

    .contact-list li {
      display: flex;
      align-items: center;
      gap: 8px;
      word-break: break-all;
    }

    .contact-list a {
      color: var(--cv-sidebar-text);
      text-decoration: none;
    }

    .contact-list a:hover {
      text-decoration: underline;
    }

    .icon {
      width: 14px;
      height: 14px;
      flex-shrink: 0;
      opacity: 0.8;
    }

    /* Skills */
    .skill-category {
      margin-bottom: 14px;
    }

    .skill-category h4 {
      font-size: 11px;
      color: #cbd5e1;
      margin-bottom: 6px;
    }

    .skill-item {
      margin-bottom: 6px;
      font-size: 11px;
    }

    .skill-header {
      display: flex;
      justify-content: space-between;
      margin-bottom: 2px;
    }

    .skill-level {
      color: var(--cv-sidebar-muted);
      font-size: 10px;
    }

    .skill-progress-bar {
      width: 100%;
      height: 5px;
      background: rgba(255, 255, 255, 0.15);
      border-radius: 99px;
      overflow: hidden;
    }

    .skill-progress-fill {
      height: 100%;
      background: var(--cv-accent);
      border-radius: 99px;
    }

    /* Certifications */
    .cert-item {
      margin-bottom: 12px;
      font-size: 12px;
    }

    .cert-title {
      font-weight: 600;
      color: var(--cv-sidebar-text);
    }

    .cert-meta {
      font-size: 11px;
      color: var(--cv-sidebar-muted);
    }

    .cert-link {
      font-size: 10px;
      color: #60a5fa;
      text-decoration: none;
    }

    /* Languages */
    .lang-item {
      display: flex;
      justify-content: space-between;
      font-size: 12px;
      margin-bottom: 6px;
    }

    .lang-level {
      color: var(--cv-sidebar-muted);
      font-size: 11px;
    }

    /* Main Section */
    main.cv-main {
      flex: 1;
      padding: 32px 36px;
      display: flex;
      flex-direction: column;
      gap: 24px;
    }

    .main-header {
      border-bottom: 1px solid var(--cv-border);
      padding-bottom: 16px;
    }

    .candidate-name {
      font-family: var(--font-display);
      font-size: 28px;
      font-weight: 800;
      color: var(--cv-text-main);
      letter-spacing: -0.02em;
    }

    .target-role {
      font-size: 16px;
      font-weight: 600;
      color: var(--cv-accent);
      margin-top: 2px;
    }

    .section-title {
      font-size: 12px;
      font-weight: 700;
      text-transform: uppercase;
      letter-spacing: 0.05em;
      color: var(--cv-text-muted);
      border-bottom: 1px solid var(--cv-border);
      padding-bottom: 6px;
      margin-bottom: 14px;
      display: flex;
      align-items: center;
      gap: 6px;
    }

    .bio-text {
      font-size: 13px;
      color: #334155;
      line-height: 1.6;
      text-align: justify;
    }

    /* Timeline */
    .timeline-item {
      position: relative;
      padding-left: 20px;
      border-left: 2px solid var(--cv-border);
      margin-bottom: 22px;
    }

    .timeline-node {
      position: absolute;
      left: -6px;
      top: 4px;
      width: 10px;
      height: 10px;
      border-radius: 50%;
      background: var(--cv-accent);
      box-shadow: 0 0 0 3px white;
    }

    .timeline-header {
      display: flex;
      justify-content: space-between;
      align-items: baseline;
      margin-bottom: 4px;
      gap: 8px;
      flex-wrap: wrap;
    }

    .role-title {
      font-size: 15px;
      font-weight: 700;
      color: var(--cv-text-main);
    }

    .company-meta {
      font-size: 12px;
      color: #64748b;
      margin-top: 2px;
    }

    .company-name {
      color: var(--cv-accent);
      font-weight: 600;
    }

    .date-range {
      font-size: 12px;
      font-weight: 600;
      color: #64748b;
      white-space: nowrap;
    }

    .job-summary {
      font-size: 12px;
      color: #475569;
      font-style: italic;
      margin-bottom: 6px;
    }

    .achievements-list {
      list-style-type: disc;
      padding-left: 18px;
      font-size: 12px;
      color: #334155;
      display: flex;
      flex-direction: column;
      gap: 4px;
    }

    .tech-stack {
      margin-top: 8px;
      display: flex;
      flex-wrap: wrap;
      align-items: center;
      gap: 5px;
      font-size: 11px;
    }

    .tech-label {
      color: #94a3b8;
      font-weight: 600;
    }

    .tech-badge {
      background: #f1f5f9;
      color: #334155;
      padding: 2px 8px;
      border-radius: 4px;
      font-weight: 500;
    }

    /* Education */
    .education-item {
      margin-bottom: 16px;
    }

    .edu-header {
      display: flex;
      justify-content: space-between;
      align-items: baseline;
      gap: 8px;
    }

    .degree-title {
      font-size: 14px;
      font-weight: 700;
      color: var(--cv-text-main);
    }

    .edu-meta {
      font-size: 12px;
      color: #64748b;
    }

    .honors-tag {
      font-size: 11px;
      font-weight: 600;
      color: #1e40af;
      margin-top: 2px;
    }

    .edu-details {
      font-size: 12px;
      color: #475569;
      margin-top: 2px;
    }

    /* Projects Grid */
    .projects-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
      gap: 12px;
    }

    .project-card {
      background: #f8fafc;
      border: 1px solid var(--cv-border);
      border-radius: 8px;
      padding: 12px;
      display: flex;
      flex-direction: column;
      gap: 6px;
    }

    .project-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
    }

    .project-title {
      font-size: 13px;
      font-weight: 700;
      color: var(--cv-text-main);
    }

    .project-link {
      font-size: 11px;
      color: var(--cv-accent);
      text-decoration: none;
    }

    .project-desc {
      font-size: 11px;
      color: #475569;
      line-height: 1.4;
    }

    .project-metric {
      font-size: 11px;
      font-weight: 600;
      color: #047857;
      background: #ecfdf5;
      padding: 2px 6px;
      border-radius: 4px;
      align-self: flex-start;
    }

    .project-tags {
      display: flex;
      flex-wrap: wrap;
      gap: 4px;
      margin-top: 4px;
    }

    .tag-pill {
      font-size: 9px;
      background: white;
      border: 1px solid #e2e8f0;
      padding: 1px 5px;
      border-radius: 3px;
      color: #64748b;
    }

    /* ========================================================
       PRINT MEDIA QUERY (NATIVO A4 PARA CUALQUIER NAVEGADOR)
       ======================================================== */
    @page {
      size: A4 portrait;
      margin: 8mm 8mm;
    }

    @media print {
      body {
        background: white !important;
        padding: 0 !important;
        -webkit-print-color-adjust: exact !important;
        print-color-adjust: exact !important;
      }

      .no-print, .action-bar, button {
        display: none !important;
      }

      .a4-container {
        max-width: 100% !important;
        width: 100% !important;
        margin: 0 !important;
        box-shadow: none !important;
        border: none !important;
      }

      .page-break-avoid {
        break-inside: avoid !important;
        page-break-inside: avoid !important;
      }
    }
  </style>
</head>
<body>

  <!-- Barra de Acciones Flotante (no visible al imprimir ni en PDF) -->
  <header class="action-bar no-print">
    <div class="brand-title">
      ${profile.name} <span>/ CV</span>
    </div>
    <div class="btn-group">
      <button onclick="window.print()" class="btn btn-secondary">
        🖨️ Imprimir A4
      </button>
      <button onclick="downloadPdf()" class="btn btn-primary" id="btn-pdf">
        📥 Descargar PDF
      </button>
    </div>
  </header>

  <!-- Contenedor A4 Principal Semántico -->
  <article class="a4-container" id="cv-content">
    
    <!-- ASIDE (Sidebar en Desktop) -->
    <aside class="cv-sidebar">
      ${photoHtml}

      <section class="sidebar-section">
        <h3>Contacto</h3>
        <ul class="contact-list">
          ${contactItemsHtml}
        </ul>
      </section>

      ${skillCategories && skillCategories.length > 0 ? `
        <section class="sidebar-section page-break-avoid">
          <h3>Habilidades & Stack</h3>
          ${skillsHtml}
        </section>
      ` : ''}

      ${certifications && certifications.length > 0 ? `
        <section class="sidebar-section page-break-avoid">
          <h3>Certificaciones</h3>
          ${certsHtml}
        </section>
      ` : ''}

      ${languages && languages.length > 0 ? `
        <section class="sidebar-section page-break-avoid">
          <h3>Idiomas</h3>
          <ul style="list-style: none;">
            ${languagesHtml}
          </ul>
        </section>
      ` : ''}
    </aside>

    <!-- MAIN (Trayectoria & Educación) -->
    <main class="cv-main">
      <header class="main-header">
        <h1 class="candidate-name">${profile.name}</h1>
        <p class="target-role">${profile.targetRole}</p>
      </header>

      ${profile.bio ? `
        <section class="page-break-avoid">
          <h2 class="section-title">Perfil Profesional</h2>
          <p class="bio-text">${profile.bio}</p>
        </section>
      ` : ''}

      ${experience && experience.length > 0 ? `
        <section>
          <h2 class="section-title">Experiencia Laboral</h2>
          <div class="timeline-container">
            ${experienceHtml}
          </div>
        </section>
      ` : ''}

      ${education && education.length > 0 ? `
        <section class="page-break-avoid">
          <h2 class="section-title">Educación</h2>
          ${educationHtml}
        </section>
      ` : ''}

      ${projects && projects.length > 0 ? `
        <section class="page-break-avoid">
          <h2 class="section-title">Proyectos Clave</h2>
          <div class="projects-grid">
            ${projectsHtml}
          </div>
        </section>
      ` : ''}
    </main>

  </article>

  <!-- Lógica JavaScript Vanilla para PDF directo -->
  <script>
    function downloadPdf() {
      const btn = document.getElementById('btn-pdf');
      const originalText = btn.innerHTML;
      btn.innerHTML = 'Generando...';
      btn.disabled = true;

      const element = document.getElementById('cv-content');
      const opt = {
        margin: [6, 6, 6, 6],
        filename: '${profile.name.replace(/\s+/g, '_')}_CV.pdf',
        image: { type: 'jpeg', quality: 0.98 },
        html2canvas: { scale: 2, useCORS: true, logging: false },
        jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' },
        pagebreak: { mode: ['css', 'legacy'] }
      };

      if (window.html2pdf) {
        html2pdf().set(opt).from(element).save().then(() => {
          btn.innerHTML = originalText;
          btn.disabled = false;
        }).catch(err => {
          console.error(err);
          window.print();
          btn.innerHTML = originalText;
          btn.disabled = false;
        });
      } else {
        window.print();
        btn.innerHTML = originalText;
        btn.disabled = false;
      }
    }
  </script>
</body>
</html>`;
}

export function downloadVanillaHtmlFile(data: CVData, settings: DesignSettings) {
  const content = generateStandaloneHtml(data, settings);
  const blob = new Blob([content], { type: 'text/html;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = 'index.html';
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}
