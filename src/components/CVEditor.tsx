import React, { useState } from 'react';
import {
  User,
  Briefcase,
  GraduationCap,
  Award,
  Sparkles,
  Plus,
  Trash2,
  Upload,
  Globe,
  Layers,
  Wand2,
  Check,
  ChevronDown,
  ChevronUp
} from 'lucide-react';
import { CVData, ExperienceItem, EducationItem, CertificationItem, SkillCategory, LanguageItem, ProjectItem } from '../types/cv';
import { polishActionSentence, ACTION_VERBS } from '../utils/unstructuredParser';

interface CVEditorProps {
  data: CVData;
  onChange: (updated: CVData) => void;
}

export const CVEditor: React.FC<CVEditorProps> = ({ data, onChange }) => {
  const [activeSection, setActiveSection] = useState<'profile' | 'experience' | 'education' | 'skills' | 'certifications' | 'languages' | 'projects'>('profile');
  const [copiedVerb, setCopiedVerb] = useState<string | null>(null);

  // Helper for deep immutable updates
  const updateProfile = (field: keyof CVData['profile'], value: any) => {
    onChange({
      ...data,
      profile: {
        ...data.profile,
        [field]: value
      }
    });
  };

  // Image file upload handler
  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        updateProfile('photoUrl', reader.result as string);
        updateProfile('showPhoto', true);
      };
      reader.readAsDataURL(file);
    }
  };

  // Experience handlers
  const addExperience = () => {
    const newExp: ExperienceItem = {
      id: `exp-${Date.now()}`,
      role: 'Nuevo Cargo / Puesto',
      company: 'Empresa',
      location: 'Madrid, España',
      startDate: '2023',
      endDate: 'Presente',
      isCurrent: true,
      employmentType: 'Tiempo Completo',
      achievements: ['Lideró la iniciativa clave generando un incremento del 20% en la productividad.'],
      technologies: ['React', 'TypeScript']
    };
    onChange({
      ...data,
      experience: [newExp, ...data.experience]
    });
  };

  const updateExperience = (index: number, updated: ExperienceItem) => {
    const next = [...data.experience];
    next[index] = updated;
    onChange({ ...data, experience: next });
  };

  const removeExperience = (index: number) => {
    const next = data.experience.filter((_, i) => i !== index);
    onChange({ ...data, experience: next });
  };

  const polishBullet = (expIndex: number, bulletIndex: number) => {
    const target = data.experience[expIndex];
    if (!target) return;
    const currentText = target.achievements[bulletIndex] || '';
    const polished = polishActionSentence(currentText);
    const newAchievements = [...target.achievements];
    newAchievements[bulletIndex] = polished;
    updateExperience(expIndex, { ...target, achievements: newAchievements });
  };

  // Education handlers
  const addEducation = () => {
    const newEdu: EducationItem = {
      id: `edu-${Date.now()}`,
      degree: 'Título o Grado Académico',
      institution: 'Universidad o Instituto',
      location: 'Ciudad, País',
      startDate: '2019',
      endDate: '2023',
      details: 'Especialización o proyecto de fin de carrera destacado.'
    };
    onChange({
      ...data,
      education: [newEdu, ...data.education]
    });
  };

  const updateEducation = (index: number, updated: EducationItem) => {
    const next = [...data.education];
    next[index] = updated;
    onChange({ ...data, education: next });
  };

  const removeEducation = (index: number) => {
    onChange({ ...data, education: data.education.filter((_, i) => i !== index) });
  };

  // Certifications handlers
  const addCertification = () => {
    const newCert: CertificationItem = {
      id: `cert-${Date.now()}`,
      name: 'Nueva Certificación Oficial',
      issuer: 'Entidad Emisora',
      issueDate: '2024',
      credentialUrl: 'https://'
    };
    onChange({ ...data, certifications: [...data.certifications, newCert] });
  };

  const updateCertification = (index: number, updated: CertificationItem) => {
    const next = [...data.certifications];
    next[index] = updated;
    onChange({ ...data, certifications: next });
  };

  const removeCertification = (index: number) => {
    onChange({ ...data, certifications: data.certifications.filter((_, i) => i !== index) });
  };

  // Skill category handlers
  const addSkillCategory = () => {
    const newCat: SkillCategory = {
      id: `cat-${Date.now()}`,
      categoryName: 'Nueva Categoría',
      skills: [{ name: 'Habilidad', level: 'Avanzado', percent: 85 }]
    };
    onChange({ ...data, skillCategories: [...data.skillCategories, newCat] });
  };

  const updateSkillCategory = (index: number, updated: SkillCategory) => {
    const next = [...data.skillCategories];
    next[index] = updated;
    onChange({ ...data, skillCategories: next });
  };

  const removeSkillCategory = (index: number) => {
    onChange({ ...data, skillCategories: data.skillCategories.filter((_, i) => i !== index) });
  };

  const handleCopyVerb = (verb: string) => {
    setCopiedVerb(verb);
    navigator.clipboard?.writeText(verb);
    setTimeout(() => setCopiedVerb(null), 1500);
  };

  return (
    <div className="bg-white rounded-xl border border-slate-200/90 shadow-xs overflow-hidden flex flex-col h-full editor-pane">
      {/* Editor Section Switcher */}
      <div className="flex border-b border-slate-200 overflow-x-auto p-1.5 bg-slate-50 gap-1 scrollbar-none">
        {[
          { id: 'profile', label: 'Perfil & Foto', icon: User },
          { id: 'experience', label: 'Experiencia', icon: Briefcase },
          { id: 'education', label: 'Educación', icon: GraduationCap },
          { id: 'skills', label: 'Habilidades', icon: Layers },
          { id: 'certifications', label: 'Certificaciones', icon: Award },
          { id: 'languages', label: 'Idiomas', icon: Globe },
          { id: 'projects', label: 'Proyectos', icon: Sparkles }
        ].map(tab => {
          const Icon = tab.icon;
          const isActive = activeSection === tab.id;
          return (
            <button
              key={tab.id}
              type="button"
              onClick={() => setActiveSection(tab.id as any)}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-all ${
                isActive
                  ? 'bg-white text-blue-600 shadow-xs border border-slate-200/80'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
              }`}
            >
              <Icon className="w-3.5 h-3.5" />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      <div className="p-4 md:p-6 overflow-y-auto flex-1 space-y-6">
        
        {/* ========================================================
            PROFILE SECTION
           ======================================================== */}
        {activeSection === 'profile' && (
          <div className="space-y-5">
            <div>
              <h2 className="text-sm font-bold text-slate-900">Datos Personales y Contacto</h2>
              <p className="text-xs text-slate-500">Configura tu identidad profesional y enlaces visibles en el CV.</p>
            </div>

            {/* Photo settings */}
            <div className="p-4 rounded-xl border border-slate-200 bg-slate-50/50 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-slate-800">Foto de Perfil</span>
                <label className="flex items-center gap-2 cursor-pointer text-xs font-medium text-slate-700">
                  <input
                    type="checkbox"
                    checked={data.profile.showPhoto}
                    onChange={e => updateProfile('showPhoto', e.target.checked)}
                    className="rounded text-blue-600 focus:ring-blue-500"
                  />
                  <span>Mostrar foto en CV</span>
                </label>
              </div>

              {data.profile.showPhoto && (
                <div className="flex flex-col sm:flex-row items-center gap-4 pt-1">
                  <div className="w-20 h-20 rounded-xl overflow-hidden border border-slate-300 bg-white shadow-xs shrink-0">
                    <img
                      src={data.profile.photoUrl}
                      alt="Preview"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="flex-1 space-y-2 w-full">
                    <div className="flex flex-wrap items-center gap-2">
                      <label className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium bg-white border border-slate-300 hover:bg-slate-50 rounded-lg cursor-pointer text-slate-700 transition-colors">
                        <Upload className="w-3.5 h-3.5" />
                        <span>Subir imagen propia</span>
                        <input
                          type="file"
                          accept="image/*"
                          onChange={handlePhotoUpload}
                          className="hidden"
                        />
                      </label>
                      <button
                        type="button"
                        onClick={() => updateProfile('photoUrl', '/src/assets/images/avatar_tech_lead_1792986076800.jpg')}
                        className="px-2.5 py-1.5 text-xs font-medium bg-white border border-slate-200 rounded-lg hover:border-blue-400 text-slate-600 transition-colors"
                      >
                        Retrato Ejecutivo (A)
                      </button>
                      <button
                        type="button"
                        onClick={() => updateProfile('photoUrl', '/src/assets/images/avatar_product_engineer_1792986076261.jpg')}
                        className="px-2.5 py-1.5 text-xs font-medium bg-white border border-slate-200 rounded-lg hover:border-blue-400 text-slate-600 transition-colors"
                      >
                        Retrato Ejecutivo (B)
                      </button>
                    </div>
                    <input
                      type="text"
                      placeholder="O pega una URL de imagen..."
                      value={data.profile.photoUrl}
                      onChange={e => updateProfile('photoUrl', e.target.value)}
                      className="w-full text-xs px-3 py-1.5 border border-slate-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-500 bg-white"
                    />
                  </div>
                </div>
              )}
            </div>

            {/* Basic Info Inputs */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Nombre Completo</label>
                <input
                  type="text"
                  value={data.profile.name}
                  onChange={e => updateProfile('name', e.target.value)}
                  className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg focus:ring-1 focus:ring-blue-500"
                  placeholder="Juan Carlos Figueredo"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Puesto Objetivo / Especialidad</label>
                <input
                  type="text"
                  value={data.profile.targetRole}
                  onChange={e => updateProfile('targetRole', e.target.value)}
                  className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg focus:ring-1 focus:ring-blue-500"
                  placeholder="Senior Full-Stack & Cloud Solutions Lead"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Email Profesional</label>
                <input
                  type="email"
                  value={data.profile.email}
                  onChange={e => updateProfile('email', e.target.value)}
                  className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg focus:ring-1 focus:ring-blue-500"
                  placeholder="tu.email@ejemplo.com"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Teléfono</label>
                <input
                  type="text"
                  value={data.profile.phone}
                  onChange={e => updateProfile('phone', e.target.value)}
                  className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg focus:ring-1 focus:ring-blue-500"
                  placeholder="+34 600 000 000"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Ubicación</label>
                <input
                  type="text"
                  value={data.profile.location}
                  onChange={e => updateProfile('location', e.target.value)}
                  className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg focus:ring-1 focus:ring-blue-500"
                  placeholder="Madrid, España (Disponible Remoto)"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">LinkedIn</label>
                <input
                  type="text"
                  value={data.profile.linkedin}
                  onChange={e => updateProfile('linkedin', e.target.value)}
                  className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg focus:ring-1 focus:ring-blue-500"
                  placeholder="https://linkedin.com/in/usuario"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">GitHub</label>
                <input
                  type="text"
                  value={data.profile.github}
                  onChange={e => updateProfile('github', e.target.value)}
                  className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg focus:ring-1 focus:ring-blue-500"
                  placeholder="https://github.com/usuario"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Sitio Web / Portfolio</label>
                <input
                  type="text"
                  value={data.profile.website}
                  onChange={e => updateProfile('website', e.target.value)}
                  className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg focus:ring-1 focus:ring-blue-500"
                  placeholder="https://tuportafolio.dev"
                />
              </div>
            </div>

            {/* Bio / Summary */}
            <div>
              <div className="flex items-center justify-between mb-1">
                <label className="text-xs font-semibold text-slate-700">Resumen Profesional / Biografía</label>
                <span className="text-[11px] text-slate-400">
                  {(data.profile.bio || '').split(/\s+/).filter(Boolean).length} palabras
                </span>
              </div>
              <textarea
                rows={4}
                value={data.profile.bio}
                onChange={e => updateProfile('bio', e.target.value)}
                className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg focus:ring-1 focus:ring-blue-500 leading-relaxed"
                placeholder="Escribe un resumen conciso destacando tu valor, especialidad técnica y logros más representativos..."
              />
            </div>

            {/* QR code toggle */}
            <div className="pt-2">
              <label className="flex items-center gap-2 cursor-pointer text-xs font-medium text-slate-700">
                <input
                  type="checkbox"
                  checked={data.profile.showQrCode}
                  onChange={e => updateProfile('showQrCode', e.target.checked)}
                  className="rounded text-blue-600 focus:ring-blue-500"
                />
                <span>Mostrar QR de verificación / portfolio al pie del CV</span>
              </label>
            </div>
          </div>
        )}

        {/* ========================================================
            EXPERIENCE SECTION
           ======================================================== */}
        {activeSection === 'experience' && (
          <div className="space-y-5">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-sm font-bold text-slate-900">Historial y Experiencia Laboral</h2>
                <p className="text-xs text-slate-500">Comienza tus viñetas con verbos de acción y añade métricas cuantificables.</p>
              </div>
              <button
                type="button"
                onClick={addExperience}
                className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-white bg-blue-600 hover:bg-blue-700 rounded-lg shadow-xs transition-colors"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Añadir Empleo</span>
              </button>
            </div>

            {/* Action Verbs Quick Inserter Box */}
            <div className="p-3 bg-blue-50/70 border border-blue-200/80 rounded-lg space-y-1.5">
              <div className="flex items-center justify-between text-xs font-semibold text-blue-900">
                <span className="flex items-center gap-1">
                  <Wand2 className="w-3.5 h-3.5 text-blue-600" />
                  <span>Banco de Verbos de Acción recomendados por Reclutadores:</span>
                </span>
                {copiedVerb && (
                  <span className="text-emerald-700 font-bold flex items-center gap-0.5 text-[11px]">
                    <Check className="w-3 h-3" /> ¡Copiado: "{copiedVerb}"!
                  </span>
                )}
              </div>
              <div className="flex flex-wrap gap-1">
                {ACTION_VERBS.slice(0, 14).map(verb => (
                  <button
                    key={verb}
                    type="button"
                    onClick={() => handleCopyVerb(verb)}
                    className="text-[11px] px-2 py-0.5 bg-white border border-blue-200 hover:border-blue-400 text-blue-800 rounded font-medium transition-colors"
                    title="Click para copiar al portapapeles"
                  >
                    {verb}
                  </button>
                ))}
              </div>
            </div>

            {/* Experiences list */}
            <div className="space-y-4">
              {data.experience.map((job, expIndex) => (
                <div key={job.id} className="p-4 rounded-xl border border-slate-200 bg-white space-y-3.5 shadow-2xs">
                  <div className="flex items-start justify-between gap-2">
                    <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                      Empleo #{expIndex + 1}
                    </span>
                    <button
                      type="button"
                      onClick={() => removeExperience(expIndex)}
                      className="text-slate-400 hover:text-red-600 transition-colors p-1"
                      title="Eliminar este empleo"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
                    <div>
                      <label className="block text-[11px] font-semibold text-slate-700 mb-0.5">Cargo / Rol</label>
                      <input
                        type="text"
                        value={job.role}
                        onChange={e => updateExperience(expIndex, { ...job, role: e.target.value })}
                        className="w-full px-2.5 py-1.5 text-xs border border-slate-300 rounded-md focus:ring-1 focus:ring-blue-500"
                        placeholder="Tech Lead"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] font-semibold text-slate-700 mb-0.5">Empresa</label>
                      <input
                        type="text"
                        value={job.company}
                        onChange={e => updateExperience(expIndex, { ...job, company: e.target.value })}
                        className="w-full px-2.5 py-1.5 text-xs border border-slate-300 rounded-md focus:ring-1 focus:ring-blue-500"
                        placeholder="Empresa Tech"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] font-semibold text-slate-700 mb-0.5">Modalidad</label>
                      <select
                        value={job.employmentType}
                        onChange={e => updateExperience(expIndex, { ...job, employmentType: e.target.value as any })}
                        className="w-full px-2.5 py-1.5 text-xs border border-slate-300 rounded-md focus:ring-1 focus:ring-blue-500"
                      >
                        <option value="Tiempo Completo">Tiempo Completo</option>
                        <option value="Remoto">Remoto</option>
                        <option value="Híbrido">Híbrido</option>
                        <option value="Contractor">Contractor</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-[11px] font-semibold text-slate-700 mb-0.5">Fecha Inicio</label>
                      <input
                        type="text"
                        value={job.startDate}
                        onChange={e => updateExperience(expIndex, { ...job, startDate: e.target.value })}
                        className="w-full px-2.5 py-1.5 text-xs border border-slate-300 rounded-md focus:ring-1 focus:ring-blue-500"
                        placeholder="2022 - 01"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] font-semibold text-slate-700 mb-0.5">Fecha Fin</label>
                      <input
                        type="text"
                        value={job.endDate}
                        onChange={e => updateExperience(expIndex, { ...job, endDate: e.target.value })}
                        className="w-full px-2.5 py-1.5 text-xs border border-slate-300 rounded-md focus:ring-1 focus:ring-blue-500"
                        placeholder="Presente"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] font-semibold text-slate-700 mb-0.5">Ubicación</label>
                      <input
                        type="text"
                        value={job.location}
                        onChange={e => updateExperience(expIndex, { ...job, location: e.target.value })}
                        className="w-full px-2.5 py-1.5 text-xs border border-slate-300 rounded-md focus:ring-1 focus:ring-blue-500"
                        placeholder="Madrid, España"
                      />
                    </div>
                  </div>

                  {/* Achievements Bullets */}
                  <div className="space-y-2 pt-1 border-t border-slate-100">
                    <div className="flex items-center justify-between">
                      <label className="text-[11px] font-bold text-slate-700 uppercase tracking-wide">
                        Logros y Responsabilidades Clave (orientadas a impacto)
                      </label>
                      <button
                        type="button"
                        onClick={() => {
                          const newAch = [...(job.achievements || []), ''];
                          updateExperience(expIndex, { ...job, achievements: newAch });
                        }}
                        className="text-[11px] font-semibold text-blue-600 hover:text-blue-800 flex items-center gap-1"
                      >
                        <Plus className="w-3 h-3" /> Añadir viñeta
                      </button>
                    </div>

                    {job.achievements.map((ach, bulletIdx) => (
                      <div key={bulletIdx} className="flex items-start gap-2">
                        <textarea
                          rows={2}
                          value={ach}
                          onChange={e => {
                            const newAch = [...job.achievements];
                            newAch[bulletIdx] = e.target.value;
                            updateExperience(expIndex, { ...job, achievements: newAch });
                          }}
                          className="flex-1 px-2.5 py-1.5 text-xs border border-slate-300 rounded-md focus:ring-1 focus:ring-blue-500"
                          placeholder="Lideró la arquitectura de microservicios reduciendo costos en un 30%..."
                        />
                        <div className="flex flex-col gap-1 shrink-0">
                          <button
                            type="button"
                            onClick={() => polishBullet(expIndex, bulletIdx)}
                            className="p-1.5 text-amber-700 hover:bg-amber-50 rounded border border-amber-200"
                            title="Pulir con verbo de acción profesional"
                          >
                            <Sparkles className="w-3.5 h-3.5" />
                          </button>
                          <button
                            type="button"
                            onClick={() => {
                              const newAch = job.achievements.filter((_, i) => i !== bulletIdx);
                              updateExperience(expIndex, { ...job, achievements: newAch });
                            }}
                            className="p-1.5 text-slate-400 hover:text-red-600 rounded border border-slate-200"
                            title="Eliminar logro"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Technologies */}
                  <div>
                    <label className="block text-[11px] font-semibold text-slate-700 mb-1">
                      Tecnologías y herramientas (separadas por comas)
                    </label>
                    <input
                      type="text"
                      value={job.technologies ? job.technologies.join(', ') : ''}
                      onChange={e => {
                        const tokens = e.target.value.split(',').map(t => t.trim()).filter(Boolean);
                        updateExperience(expIndex, { ...job, technologies: tokens });
                      }}
                      className="w-full px-2.5 py-1.5 text-xs border border-slate-300 rounded-md focus:ring-1 focus:ring-blue-500"
                      placeholder="React, TypeScript, AWS, Docker"
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ========================================================
            EDUCATION SECTION
           ======================================================== */}
        {activeSection === 'education' && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-sm font-bold text-slate-900">Formación Académica</h2>
                <p className="text-xs text-slate-500">Títulos universitarios, másteres o grados oficiales.</p>
              </div>
              <button
                type="button"
                onClick={addEducation}
                className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-white bg-blue-600 hover:bg-blue-700 rounded-lg shadow-xs transition-colors"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Añadir Estudio</span>
              </button>
            </div>

            <div className="space-y-3">
              {data.education.map((edu, idx) => (
                <div key={edu.id} className="p-4 rounded-xl border border-slate-200 bg-white space-y-3">
                  <div className="flex items-start justify-between">
                    <span className="text-xs font-bold text-slate-400">Titulación #{idx + 1}</span>
                    <button
                      type="button"
                      onClick={() => removeEducation(idx)}
                      className="text-slate-400 hover:text-red-600 p-1"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-[11px] font-semibold text-slate-700 mb-0.5">Título o Grado</label>
                      <input
                        type="text"
                        value={edu.degree}
                        onChange={e => updateEducation(idx, { ...edu, degree: e.target.value })}
                        className="w-full px-2.5 py-1.5 text-xs border border-slate-300 rounded-md"
                        placeholder="Grado en Ingeniería Informática"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] font-semibold text-slate-700 mb-0.5">Institución / Universidad</label>
                      <input
                        type="text"
                        value={edu.institution}
                        onChange={e => updateEducation(idx, { ...edu, institution: e.target.value })}
                        className="w-full px-2.5 py-1.5 text-xs border border-slate-300 rounded-md"
                        placeholder="Universidad Politécnica de Madrid"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] font-semibold text-slate-700 mb-0.5">Años de Cursado</label>
                      <div className="flex gap-2">
                        <input
                          type="text"
                          value={edu.startDate}
                          onChange={e => updateEducation(idx, { ...edu, startDate: e.target.value })}
                          className="w-1/2 px-2.5 py-1.5 text-xs border border-slate-300 rounded-md"
                          placeholder="2016"
                        />
                        <input
                          type="text"
                          value={edu.endDate}
                          onChange={e => updateEducation(idx, { ...edu, endDate: e.target.value })}
                          className="w-1/2 px-2.5 py-1.5 text-xs border border-slate-300 rounded-md"
                          placeholder="2020"
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block text-[11px] font-semibold text-slate-700 mb-0.5">Menciones u Honores (Opcional)</label>
                      <input
                        type="text"
                        value={edu.honorsOrGpa || ''}
                        onChange={e => updateEducation(idx, { ...edu, honorsOrGpa: e.target.value })}
                        className="w-full px-2.5 py-1.5 text-xs border border-slate-300 rounded-md"
                        placeholder="Matrícula de honor en TFG"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-[11px] font-semibold text-slate-700 mb-0.5">Detalles Relevantes</label>
                    <input
                      type="text"
                      value={edu.details || ''}
                      onChange={e => updateEducation(idx, { ...edu, details: e.target.value })}
                      className="w-full px-2.5 py-1.5 text-xs border border-slate-300 rounded-md"
                      placeholder="Especialidad en Arquitecturas Cloud y Seguridad..."
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ========================================================
            SKILLS SECTION
           ======================================================== */}
        {activeSection === 'skills' && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-sm font-bold text-slate-900">Categorías de Habilidades</h2>
                <p className="text-xs text-slate-500">Agrupa tus tecnologías para que los ATS las indexen rápidamente.</p>
              </div>
              <button
                type="button"
                onClick={addSkillCategory}
                className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-white bg-blue-600 hover:bg-blue-700 rounded-lg shadow-xs transition-colors"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Añadir Categoría</span>
              </button>
            </div>

            <div className="space-y-4">
              {data.skillCategories.map((cat, catIdx) => (
                <div key={cat.id} className="p-4 rounded-xl border border-slate-200 bg-white space-y-3">
                  <div className="flex items-center justify-between">
                    <input
                      type="text"
                      value={cat.categoryName}
                      onChange={e => updateSkillCategory(catIdx, { ...cat, categoryName: e.target.value })}
                      className="text-xs font-bold text-slate-900 px-2 py-1 border border-slate-300 rounded-md focus:ring-1 focus:ring-blue-500"
                    />
                    <button
                      type="button"
                      onClick={() => removeSkillCategory(catIdx)}
                      className="text-slate-400 hover:text-red-600 p-1"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  <div className="space-y-2">
                    {cat.skills.map((skill, skillIdx) => (
                      <div key={skillIdx} className="flex items-center gap-2">
                        <input
                          type="text"
                          value={skill.name}
                          onChange={e => {
                            const newSkills = [...cat.skills];
                            newSkills[skillIdx] = { ...skill, name: e.target.value };
                            updateSkillCategory(catIdx, { ...cat, skills: newSkills });
                          }}
                          className="flex-1 px-2.5 py-1 text-xs border border-slate-300 rounded-md"
                          placeholder="Nombre tecnología"
                        />
                        <select
                          value={skill.level}
                          onChange={e => {
                            const newSkills = [...cat.skills];
                            const lvl = e.target.value as 'Básico' | 'Intermedio' | 'Avanzado' | 'Experto';
                            const pctMap: Record<string, number> = { 'Básico': 50, 'Intermedio': 70, 'Avanzado': 85, 'Experto': 95 };
                            newSkills[skillIdx] = { ...skill, level: lvl, percent: pctMap[lvl] || 80 };
                            updateSkillCategory(catIdx, { ...cat, skills: newSkills });
                          }}
                          className="w-28 px-2 py-1 text-xs border border-slate-300 rounded-md"
                        >
                          <option value="Básico">Básico</option>
                          <option value="Intermedio">Intermedio</option>
                          <option value="Avanzado">Avanzado</option>
                          <option value="Experto">Experto</option>
                        </select>
                        <button
                          type="button"
                          onClick={() => {
                            const newSkills = cat.skills.filter((_, i) => i !== skillIdx);
                            updateSkillCategory(catIdx, { ...cat, skills: newSkills });
                          }}
                          className="text-slate-400 hover:text-red-500 p-1"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    ))}
                    <button
                      type="button"
                      onClick={() => {
                        const newSkills = [...cat.skills, { name: 'Nueva Tecnología', level: 'Avanzado' as const, percent: 85 }];
                        updateSkillCategory(catIdx, { ...cat, skills: newSkills });
                      }}
                      className="text-xs font-semibold text-blue-600 hover:text-blue-800 flex items-center gap-1 pt-1"
                    >
                      <Plus className="w-3 h-3" /> Añadir habilidad a esta categoría
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ========================================================
            CERTIFICATIONS SECTION
           ======================================================== */}
        {activeSection === 'certifications' && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-sm font-bold text-slate-900">Cursos y Certificaciones Oficiales</h2>
                <p className="text-xs text-slate-500">Valida tus competencias con insignias y credenciales verificables.</p>
              </div>
              <button
                type="button"
                onClick={addCertification}
                className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-white bg-blue-600 hover:bg-blue-700 rounded-lg shadow-xs transition-colors"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Añadir Certificación</span>
              </button>
            </div>

            <div className="space-y-3">
              {data.certifications.map((cert, idx) => (
                <div key={cert.id} className="p-4 rounded-xl border border-slate-200 bg-white space-y-3">
                  <div className="flex items-start justify-between">
                    <span className="text-xs font-bold text-slate-400">Certificación #{idx + 1}</span>
                    <button
                      type="button"
                      onClick={() => removeCertification(idx)}
                      className="text-slate-400 hover:text-red-600 p-1"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div className="sm:col-span-2">
                      <label className="block text-[11px] font-semibold text-slate-700 mb-0.5">Nombre de la Certificación</label>
                      <input
                        type="text"
                        value={cert.name}
                        onChange={e => updateCertification(idx, { ...cert, name: e.target.value })}
                        className="w-full px-2.5 py-1.5 text-xs border border-slate-300 rounded-md"
                        placeholder="AWS Certified Solutions Architect – Professional"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] font-semibold text-slate-700 mb-0.5">Entidad Emisora</label>
                      <input
                        type="text"
                        value={cert.issuer}
                        onChange={e => updateCertification(idx, { ...cert, issuer: e.target.value })}
                        className="w-full px-2.5 py-1.5 text-xs border border-slate-300 rounded-md"
                        placeholder="Amazon Web Services"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] font-semibold text-slate-700 mb-0.5">Fecha de Emisión</label>
                      <input
                        type="text"
                        value={cert.issueDate}
                        onChange={e => updateCertification(idx, { ...cert, issueDate: e.target.value })}
                        className="w-full px-2.5 py-1.5 text-xs border border-slate-300 rounded-md"
                        placeholder="2024 - 05"
                      />
                    </div>
                    <div className="sm:col-span-2">
                      <label className="block text-[11px] font-semibold text-slate-700 mb-0.5">Enlace de Validación / Credencial</label>
                      <input
                        type="text"
                        value={cert.credentialUrl || ''}
                        onChange={e => updateCertification(idx, { ...cert, credentialUrl: e.target.value })}
                        className="w-full px-2.5 py-1.5 text-xs border border-slate-300 rounded-md"
                        placeholder="https://aws.amazon.com/verification/..."
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ========================================================
            LANGUAGES SECTION
           ======================================================== */}
        {activeSection === 'languages' && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-sm font-bold text-slate-900">Idiomas</h2>
                <p className="text-xs text-slate-500">Idiomas hablados y nivel según el marco común europeo (MCER).</p>
              </div>
              <button
                type="button"
                onClick={() => {
                  const newLang: LanguageItem = {
                    id: `lang-${Date.now()}`,
                    language: 'Nuevo Idioma',
                    proficiency: 'Profesional Avanzado (C1)'
                  };
                  onChange({ ...data, languages: [...data.languages, newLang] });
                }}
                className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-white bg-blue-600 hover:bg-blue-700 rounded-lg shadow-xs transition-colors"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Añadir Idioma</span>
              </button>
            </div>

            <div className="space-y-2">
              {data.languages.map((lang, idx) => (
                <div key={lang.id} className="flex items-center gap-2 p-3 rounded-lg border border-slate-200 bg-white">
                  <input
                    type="text"
                    value={lang.language}
                    onChange={e => {
                      const next = [...data.languages];
                      next[idx] = { ...lang, language: e.target.value };
                      onChange({ ...data, languages: next });
                    }}
                    className="flex-1 px-2.5 py-1.5 text-xs border border-slate-300 rounded-md"
                    placeholder="Idioma (ej. Inglés)"
                  />
                  <select
                    value={lang.proficiency}
                    onChange={e => {
                      const next = [...data.languages];
                      next[idx] = { ...lang, proficiency: e.target.value as any };
                      onChange({ ...data, languages: next });
                    }}
                    className="px-2.5 py-1.5 text-xs border border-slate-300 rounded-md"
                  >
                    <option value="Nativo">Nativo</option>
                    <option value="Bilingüe (C2)">Bilingüe (C2)</option>
                    <option value="Profesional Avanzado (C1)">Profesional Avanzado (C1)</option>
                    <option value="Intermedio (B2)">Intermedio (B2)</option>
                    <option value="Básico (A2)">Básico (A2)</option>
                  </select>
                  <button
                    type="button"
                    onClick={() => {
                      onChange({ ...data, languages: data.languages.filter((_, i) => i !== idx) });
                    }}
                    className="text-slate-400 hover:text-red-500 p-1"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ========================================================
            PROJECTS SECTION
           ======================================================== */}
        {activeSection === 'projects' && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-sm font-bold text-slate-900">Proyectos Destacados</h2>
                <p className="text-xs text-slate-500">Muestra proyectos con código abierto, demostraciones o métricas de impacto.</p>
              </div>
              <button
                type="button"
                onClick={() => {
                  const newProj: ProjectItem = {
                    id: `proj-${Date.now()}`,
                    name: 'Nombre del Proyecto',
                    role: 'Creador / Lead',
                    description: 'Descripción breve de la arquitectura y problema que resuelve.',
                    impactMetric: '+10k usuarios activos',
                    tags: ['React', 'Node.js']
                  };
                  onChange({ ...data, projects: [...data.projects, newProj] });
                }}
                className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-white bg-blue-600 hover:bg-blue-700 rounded-lg shadow-xs transition-colors"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Añadir Proyecto</span>
              </button>
            </div>

            <div className="space-y-3">
              {data.projects.map((proj, idx) => (
                <div key={proj.id} className="p-4 rounded-xl border border-slate-200 bg-white space-y-3">
                  <div className="flex items-start justify-between">
                    <span className="text-xs font-bold text-slate-400">Proyecto #{idx + 1}</span>
                    <button
                      type="button"
                      onClick={() => onChange({ ...data, projects: data.projects.filter((_, i) => i !== idx) })}
                      className="text-slate-400 hover:text-red-600 p-1"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-[11px] font-semibold text-slate-700 mb-0.5">Nombre del Proyecto</label>
                      <input
                        type="text"
                        value={proj.name}
                        onChange={e => {
                          const next = [...data.projects];
                          next[idx] = { ...proj, name: e.target.value };
                          onChange({ ...data, projects: next });
                        }}
                        className="w-full px-2.5 py-1.5 text-xs border border-slate-300 rounded-md"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] font-semibold text-slate-700 mb-0.5">Métrica de Impacto</label>
                      <input
                        type="text"
                        value={proj.impactMetric || ''}
                        onChange={e => {
                          const next = [...data.projects];
                          next[idx] = { ...proj, impactMetric: e.target.value };
                          onChange({ ...data, projects: next });
                        }}
                        className="w-full px-2.5 py-1.5 text-xs border border-slate-300 rounded-md"
                        placeholder="Reduce latencia en 30%"
                      />
                    </div>
                    <div className="sm:col-span-2">
                      <label className="block text-[11px] font-semibold text-slate-700 mb-0.5">Descripción</label>
                      <textarea
                        rows={2}
                        value={proj.description}
                        onChange={e => {
                          const next = [...data.projects];
                          next[idx] = { ...proj, description: e.target.value };
                          onChange({ ...data, projects: next });
                        }}
                        className="w-full px-2.5 py-1.5 text-xs border border-slate-300 rounded-md"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] font-semibold text-slate-700 mb-0.5">Enlace Demo / Web</label>
                      <input
                        type="text"
                        value={proj.liveUrl || ''}
                        onChange={e => {
                          const next = [...data.projects];
                          next[idx] = { ...proj, liveUrl: e.target.value };
                          onChange({ ...data, projects: next });
                        }}
                        className="w-full px-2.5 py-1.5 text-xs border border-slate-300 rounded-md"
                        placeholder="https://..."
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] font-semibold text-slate-700 mb-0.5">Repositorio GitHub</label>
                      <input
                        type="text"
                        value={proj.githubUrl || ''}
                        onChange={e => {
                          const next = [...data.projects];
                          next[idx] = { ...proj, githubUrl: e.target.value };
                          onChange({ ...data, projects: next });
                        }}
                        className="w-full px-2.5 py-1.5 text-xs border border-slate-300 rounded-md"
                        placeholder="https://github.com/..."
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

      </div>
    </div>
  );
};
