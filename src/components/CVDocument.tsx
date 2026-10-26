import React from 'react';
import {
  Mail,
  Phone,
  MapPin,
  Linkedin,
  Github,
  Globe,
  ExternalLink,
  Award,
  BookOpen,
  Briefcase,
  Layers,
  GraduationCap,
  Sparkles
} from 'lucide-react';
import { CVData, DesignSettings } from '../types/cv';

interface CVDocumentProps {
  data: CVData;
  settings: DesignSettings;
}

export const CVDocument: React.FC<CVDocumentProps> = ({ data, settings }) => {
  const { profile, experience, education, certifications, skillCategories, languages, projects } = data;
  const isTwoColumn = settings.layout === 'two-column';
  const isDarkSidebar = settings.sidebarStyle === 'dark';

  return (
    <article
      id="cv-printable-area"
      data-theme={settings.theme}
      data-sidebar={settings.sidebarStyle}
      className={`a4-document-sheet bg-white text-slate-800 transition-colors duration-200 overflow-hidden font-sans border border-slate-200/60 print:border-none print:shadow-none ${
        settings.fontSize === 'compact' ? 'text-[13px] leading-relaxed' : 'text-[14px] leading-normal'
      }`}
    >
      <div className={`w-full min-h-full ${isTwoColumn ? 'flex flex-col md:flex-row' : 'flex flex-col'}`}>
        
        {/* ========================================================
            SIDEBAR / ASIDE (Two-Column Layout Left Column)
           ======================================================== */}
        <aside
          className={`cv-sidebar transition-colors print:bg-white print:text-slate-900 ${
            isTwoColumn
              ? `w-full md:w-[36%] shrink-0 p-6 md:p-8 flex flex-col gap-6 ${
                  isDarkSidebar
                    ? 'bg-slate-900 text-slate-100 print:text-slate-900 print:border-r print:border-slate-200'
                    : 'bg-slate-50 text-slate-800 border-r border-slate-200'
                }`
              : 'hidden'
          }`}
        >
          {/* Profile Photo */}
          {profile.showPhoto && profile.photoUrl && (
            <div className="flex flex-col items-center justify-center text-center pb-2">
              <div className="relative w-36 h-36 md:w-40 md:h-40 rounded-2xl overflow-hidden border-2 border-white/20 shadow-md">
                <img
                  src={profile.photoUrl}
                  alt={profile.name}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          )}

          {/* Contact Details */}
          <section className="space-y-3">
            <h2
              className={`text-xs font-bold uppercase tracking-wider pb-1.5 border-b ${
                isDarkSidebar ? 'text-slate-300 border-slate-700/80' : 'text-slate-700 border-slate-200'
              }`}
            >
              Contacto
            </h2>
            <ul className="space-y-2.5 text-xs">
              {profile.email && (
                <li className="flex items-center gap-2.5 break-all">
                  <Mail className="w-3.5 h-3.5 shrink-0 opacity-70" />
                  <a href={`mailto:${profile.email}`} className="hover:underline transition-opacity">
                    {profile.email}
                  </a>
                </li>
              )}
              {profile.phone && (
                <li className="flex items-center gap-2.5">
                  <Phone className="w-3.5 h-3.5 shrink-0 opacity-70" />
                  <span>{profile.phone}</span>
                </li>
              )}
              {profile.location && (
                <li className="flex items-center gap-2.5">
                  <MapPin className="w-3.5 h-3.5 shrink-0 opacity-70" />
                  <span>{profile.location}</span>
                </li>
              )}
              {profile.linkedin && (
                <li className="flex items-center gap-2.5 break-all">
                  <Linkedin className="w-3.5 h-3.5 shrink-0 opacity-70" />
                  <a
                    href={profile.linkedin.startsWith('http') ? profile.linkedin : `https://${profile.linkedin}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:underline flex items-center gap-1"
                  >
                    <span>{profile.linkedin.replace(/^https?:\/\/(www\.)?linkedin\.com\/in\//, '')}</span>
                  </a>
                </li>
              )}
              {profile.github && (
                <li className="flex items-center gap-2.5 break-all">
                  <Github className="w-3.5 h-3.5 shrink-0 opacity-70" />
                  <a
                    href={profile.github.startsWith('http') ? profile.github : `https://${profile.github}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:underline"
                  >
                    <span>{profile.github.replace(/^https?:\/\/(www\.)?github\.com\//, '')}</span>
                  </a>
                </li>
              )}
              {profile.website && (
                <li className="flex items-center gap-2.5 break-all">
                  <Globe className="w-3.5 h-3.5 shrink-0 opacity-70" />
                  <a
                    href={profile.website.startsWith('http') ? profile.website : `https://${profile.website}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:underline"
                  >
                    <span>{profile.website.replace(/^https?:\/\//, '')}</span>
                  </a>
                </li>
              )}
            </ul>
          </section>

          {/* Technical Skills */}
          {skillCategories && skillCategories.length > 0 && (
            <section className="space-y-4 page-break-avoid">
              <h2
                className={`text-xs font-bold uppercase tracking-wider pb-1.5 border-b ${
                  isDarkSidebar ? 'text-slate-300 border-slate-700/80' : 'text-slate-700 border-slate-200'
                }`}
              >
                Habilidades & Stack
              </h2>
              <div className="space-y-3.5">
                {skillCategories.map(category => (
                  <div key={category.id} className="space-y-2">
                    <h3 className={`text-[11px] font-semibold tracking-wide ${isDarkSidebar ? 'text-slate-300' : 'text-slate-600'}`}>
                      {category.categoryName}
                    </h3>
                    <div className="space-y-1.5">
                      {category.skills.map(skill => (
                        <div key={skill.name} className="space-y-0.5">
                          <div className="flex justify-between items-center text-xs">
                            <span className="font-medium">{skill.name}</span>
                            <span className={`text-[10px] ${isDarkSidebar ? 'text-slate-400' : 'text-slate-500'}`}>
                              {skill.level}
                            </span>
                          </div>
                          <div className={`w-full h-1.5 rounded-full overflow-hidden ${isDarkSidebar ? 'bg-slate-800' : 'bg-slate-200'}`}>
                            <div
                              className="h-full rounded-full transition-all duration-300 bg-blue-500"
                              style={{ width: `${skill.percent || 80}%` }}
                            />
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Certifications in Sidebar */}
          {certifications && certifications.length > 0 && (
            <section className="space-y-3 page-break-avoid">
              <h2
                className={`text-xs font-bold uppercase tracking-wider pb-1.5 border-b ${
                  isDarkSidebar ? 'text-slate-300 border-slate-700/80' : 'text-slate-700 border-slate-200'
                }`}
              >
                Certificaciones
              </h2>
              <div className="space-y-3 text-xs">
                {certifications.map(cert => (
                  <div key={cert.id} className="space-y-0.5">
                    <div className="font-semibold text-slate-100 flex items-start gap-1">
                      <Award className="w-3.5 h-3.5 shrink-0 mt-0.5 text-blue-400" />
                      <span className={isDarkSidebar ? 'text-slate-200' : 'text-slate-800'}>{cert.name}</span>
                    </div>
                    <div className={`text-[11px] pl-4.5 ${isDarkSidebar ? 'text-slate-400' : 'text-slate-500'}`}>
                      <span>{cert.issuer}</span>
                      <span className="mx-1.5">·</span>
                      <span>{cert.issueDate}</span>
                    </div>
                    {cert.credentialUrl && (
                      <div className="pl-4.5">
                        <a
                          href={cert.credentialUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-[10px] text-blue-400 hover:underline inline-flex items-center gap-1"
                        >
                          <span>Verificar credencial</span>
                          <ExternalLink className="w-2.5 h-2.5" />
                        </a>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Languages */}
          {languages && languages.length > 0 && (
            <section className="space-y-2 page-break-avoid">
              <h2
                className={`text-xs font-bold uppercase tracking-wider pb-1.5 border-b ${
                  isDarkSidebar ? 'text-slate-300 border-slate-700/80' : 'text-slate-700 border-slate-200'
                }`}
              >
                Idiomas
              </h2>
              <ul className="space-y-1.5 text-xs">
                {languages.map(lang => (
                  <li key={lang.id} className="flex justify-between items-center">
                    <span className="font-medium">{lang.language}</span>
                    <span className={`text-[11px] ${isDarkSidebar ? 'text-slate-400' : 'text-slate-500'}`}>
                      {lang.proficiency}
                    </span>
                  </li>
                ))}
              </ul>
            </section>
          )}

          {/* Verification QR / Signature */}
          {profile.showQrCode && (
            <div className={`mt-auto pt-4 border-t text-center space-y-1.5 ${isDarkSidebar ? 'border-slate-800 text-slate-400' : 'border-slate-200 text-slate-500'}`}>
              <div className="w-16 h-16 mx-auto bg-white p-1 rounded-md shadow-xs flex items-center justify-center">
                <svg viewBox="0 0 24 24" className="w-full h-full text-slate-900" fill="currentColor">
                  <path d="M2 2h8v8H2V2zm2 2v4h4V4H4zm10-2h8v8h-8V2zm2 2v4h4V4h-4zM2 14h8v8H2v-8zm2 2v4h4v-4H4zm14 0h4v2h-4v-2zm-4 0h2v4h-2v-4zm4 4h4v2h-4v-2zm-2 2h2v2h-2v-2zm-2-4h2v2h-2v-2zm4-6h2v2h-2v-2zm-4 0h2v2h-2v-2z" />
                </svg>
              </div>
              <p className="text-[10px] tracking-tight">Portfolio & Verificación</p>
            </div>
          )}
        </aside>

        {/* ========================================================
            MAIN CONTENT AREA
           ======================================================== */}
        <main className={`cv-main flex-1 p-6 md:p-8 flex flex-col gap-6 ${isTwoColumn ? '' : 'max-w-4xl mx-auto'}`}>
          
          {/* Header Banner for Single-Column or Top Zone */}
          <header className="border-b border-slate-200/90 pb-5 space-y-2">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div>
                <h1 className="font-display font-extrabold text-2xl md:text-3xl text-slate-900 tracking-tight">
                  {profile.name}
                </h1>
                <p className="text-base md:text-lg font-semibold text-blue-600 mt-0.5">
                  {profile.targetRole}
                </p>
              </div>

              {/* Single Column Photo & Meta Info */}
              {!isTwoColumn && (
                <div className="flex items-center gap-4">
                  {profile.showPhoto && profile.photoUrl && (
                    <img
                      src={profile.photoUrl}
                      alt={profile.name}
                      referrerPolicy="no-referrer"
                      className="w-16 h-16 rounded-xl object-cover border border-slate-200 shadow-xs"
                    />
                  )}
                </div>
              )}
            </div>

            {/* Single column contact strip */}
            {!isTwoColumn && (
              <div className="flex flex-wrap items-center gap-y-1.5 gap-x-4 text-xs text-slate-600 pt-2 border-t border-slate-100">
                {profile.email && (
                  <span className="flex items-center gap-1.5">
                    <Mail className="w-3.5 h-3.5 text-slate-400" />
                    <span>{profile.email}</span>
                  </span>
                )}
                {profile.phone && (
                  <span className="flex items-center gap-1.5">
                    <Phone className="w-3.5 h-3.5 text-slate-400" />
                    <span>{profile.phone}</span>
                  </span>
                )}
                {profile.location && (
                  <span className="flex items-center gap-1.5">
                    <MapPin className="w-3.5 h-3.5 text-slate-400" />
                    <span>{profile.location}</span>
                  </span>
                )}
                {profile.linkedin && (
                  <span className="flex items-center gap-1.5">
                    <Linkedin className="w-3.5 h-3.5 text-slate-400" />
                    <span>{profile.linkedin.replace(/^https?:\/\/(www\.)?linkedin\.com\/in\//, '')}</span>
                  </span>
                )}
                {profile.github && (
                  <span className="flex items-center gap-1.5">
                    <Github className="w-3.5 h-3.5 text-slate-400" />
                    <span>{profile.github.replace(/^https?:\/\/(www\.)?github\.com\//, '')}</span>
                  </span>
                )}
              </div>
            )}
          </header>

          {/* Professional Bio / Summary */}
          {profile.bio && (
            <section className="space-y-1.5 page-break-avoid">
              <h2 className="text-xs font-bold uppercase tracking-wider text-slate-700 flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-blue-600"></span>
                <span>Perfil Profesional</span>
              </h2>
              <p className="text-slate-600 leading-relaxed text-justify">
                {profile.bio}
              </p>
            </section>
          )}

          {/* Work Experience Timeline */}
          {experience && experience.length > 0 && (
            <section className="space-y-4">
              <h2 className="text-xs font-bold uppercase tracking-wider text-slate-700 flex items-center gap-2 pb-1 border-b border-slate-200">
                <Briefcase className="w-3.5 h-3.5 text-blue-600" />
                <span>Experiencia Laboral</span>
              </h2>

              <div className="space-y-5">
                {experience.map(job => (
                  <div key={job.id} className="page-break-avoid relative pl-5 border-l-2 border-slate-200 space-y-2">
                    {/* Timeline bullet node */}
                    <div className="absolute -left-[5px] top-1.5 w-2 h-2 rounded-full bg-blue-600 ring-4 ring-white" />

                    {/* Job Title & Dates */}
                    <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-1">
                      <div>
                        <h3 className="font-bold text-slate-900 text-sm md:text-base">
                          {job.role}
                        </h3>
                        <div className="text-xs text-slate-600 font-medium flex items-center gap-1.5 mt-0.5">
                          <span className="text-blue-600 font-semibold">{job.company}</span>
                          <span aria-hidden="true">·</span>
                          <span>{job.location}</span>
                          <span aria-hidden="true">·</span>
                          <span className="text-slate-500 font-normal">{job.employmentType}</span>
                        </div>
                      </div>

                      <div className="text-xs font-semibold text-slate-500 whitespace-nowrap">
                        <span>{job.startDate} — {job.endDate}</span>
                      </div>
                    </div>

                    {/* Role summary */}
                    {job.summary && (
                      <p className="text-xs text-slate-600 italic">
                        {job.summary}
                      </p>
                    )}

                    {/* Quantified Achievements */}
                    {job.achievements && job.achievements.length > 0 && (
                      <ul className="space-y-1.5 text-xs text-slate-700 list-disc list-outside pl-4">
                        {job.achievements.map((ach, idx) => (
                          <li key={idx} className="leading-relaxed">
                            {ach}
                          </li>
                        ))}
                      </ul>
                    )}

                    {/* Technologies tags */}
                    {job.technologies && job.technologies.length > 0 && (
                      <div className="flex flex-wrap items-center gap-1.5 pt-1 text-[11px] text-slate-500">
                        <span className="font-medium text-slate-400">Stack:</span>
                        {job.technologies.map(tech => (
                          <span
                            key={tech}
                            className="bg-slate-100 text-slate-700 px-2 py-0.5 rounded text-[11px] font-medium"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Education */}
          {education && education.length > 0 && (
            <section className="space-y-3 page-break-avoid">
              <h2 className="text-xs font-bold uppercase tracking-wider text-slate-700 flex items-center gap-2 pb-1 border-b border-slate-200">
                <GraduationCap className="w-3.5 h-3.5 text-blue-600" />
                <span>Educación & Formación Académica</span>
              </h2>

              <div className="space-y-3">
                {education.map(edu => (
                  <div key={edu.id} className="space-y-0.5">
                    <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-1">
                      <h3 className="font-semibold text-slate-900 text-xs md:text-sm">
                        {edu.degree}
                      </h3>
                      <span className="text-xs text-slate-500 whitespace-nowrap font-medium">
                        {edu.startDate} — {edu.endDate}
                      </span>
                    </div>

                    <div className="text-xs text-slate-600">
                      <span className="font-medium">{edu.institution}</span>
                      {edu.location && (
                        <>
                          <span className="mx-1.5">·</span>
                          <span>{edu.location}</span>
                        </>
                      )}
                    </div>

                    {edu.honorsOrGpa && (
                      <div className="text-xs text-blue-700 font-medium">
                        {edu.honorsOrGpa}
                      </div>
                    )}

                    {edu.details && (
                      <p className="text-xs text-slate-500 leading-relaxed pt-0.5">
                        {edu.details}
                      </p>
                    )}
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Highlighted Projects */}
          {projects && projects.length > 0 && (
            <section className="space-y-3 page-break-avoid">
              <h2 className="text-xs font-bold uppercase tracking-wider text-slate-700 flex items-center gap-2 pb-1 border-b border-slate-200">
                <Layers className="w-3.5 h-3.5 text-blue-600" />
                <span>Proyectos Destacados</span>
              </h2>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {projects.map(proj => (
                  <div
                    key={proj.id}
                    className="p-3.5 rounded-lg border border-slate-200/90 bg-slate-50/50 space-y-1.5"
                  >
                    <div className="flex items-start justify-between gap-2">
                      <h3 className="font-bold text-slate-900 text-xs">
                        {proj.name}
                      </h3>
                      <div className="flex items-center gap-1.5 shrink-0 text-slate-500">
                        {proj.liveUrl && (
                          <a
                            href={proj.liveUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="hover:text-blue-600"
                            title="Ver en vivo"
                          >
                            <ExternalLink className="w-3.5 h-3.5" />
                          </a>
                        )}
                        {proj.githubUrl && (
                          <a
                            href={proj.githubUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="hover:text-slate-900"
                            title="Repositorio"
                          >
                            <Github className="w-3.5 h-3.5" />
                          </a>
                        )}
                      </div>
                    </div>

                    <p className="text-xs text-slate-600 leading-relaxed">
                      {proj.description}
                    </p>

                    {proj.impactMetric && (
                      <div className="text-[11px] font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded inline-block">
                        {proj.impactMetric}
                      </div>
                    )}

                    {proj.tags && proj.tags.length > 0 && (
                      <div className="flex flex-wrap gap-1 pt-1 text-[10px] text-slate-500">
                        {proj.tags.map(t => (
                          <span key={t} className="bg-white border border-slate-200 px-1.5 py-0.2 rounded font-medium">
                            {t}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Single-Column Skills & Certifications fallback */}
          {!isTwoColumn && skillCategories && skillCategories.length > 0 && (
            <section className="space-y-3 page-break-avoid border-t border-slate-200 pt-4">
              <h2 className="text-xs font-bold uppercase tracking-wider text-slate-700">
                Habilidades Técnicas
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {skillCategories.map(cat => (
                  <div key={cat.id} className="space-y-1.5">
                    <h3 className="text-xs font-semibold text-slate-800">{cat.categoryName}</h3>
                    <div className="flex flex-wrap gap-1.5">
                      {cat.skills.map(s => (
                        <span key={s.name} className="bg-slate-100 text-slate-800 px-2.5 py-1 rounded text-xs font-medium">
                          {s.name}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </section>
          )}

        </main>
      </div>
    </article>
  );
};
