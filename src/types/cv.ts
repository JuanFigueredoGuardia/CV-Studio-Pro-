export interface Profile {
  name: string;
  targetRole: string;
  bio: string;
  email: string;
  phone: string;
  location: string;
  website: string;
  linkedin: string;
  github: string;
  photoUrl: string;
  showPhoto: boolean;
  showQrCode: boolean;
}

export interface ExperienceItem {
  id: string;
  role: string;
  company: string;
  location: string;
  startDate: string;
  endDate: string;
  isCurrent: boolean;
  employmentType: 'Tiempo Completo' | 'Remoto' | 'Híbrido' | 'Contractor';
  summary?: string;
  achievements: string[];
  technologies: string[];
}

export interface EducationItem {
  id: string;
  degree: string;
  institution: string;
  location: string;
  startDate: string;
  endDate: string;
  honorsOrGpa?: string;
  details?: string;
}

export interface CertificationItem {
  id: string;
  name: string;
  issuer: string;
  issueDate: string;
  credentialId?: string;
  credentialUrl?: string;
  badgeUrl?: string;
}

export interface SkillCategory {
  id: string;
  categoryName: string;
  skills: { name: string; level: 'Básico' | 'Intermedio' | 'Avanzado' | 'Experto'; percent: number }[];
}

export interface LanguageItem {
  id: string;
  language: string;
  proficiency: 'Nativo' | 'Bilingüe (C2)' | 'Profesional Avanzado (C1)' | 'Intermedio (B2)' | 'Básico (A2)';
}

export interface ProjectItem {
  id: string;
  name: string;
  role: string;
  description: string;
  liveUrl?: string;
  githubUrl?: string;
  impactMetric?: string;
  tags: string[];
}

export type ThemePalette = 'slate' | 'emerald' | 'indigo' | 'amber' | 'monochrome';
export type LayoutVariant = 'two-column' | 'single-column';
export type SidebarStyle = 'dark' | 'light';

export interface CVData {
  profile: Profile;
  experience: ExperienceItem[];
  education: EducationItem[];
  certifications: CertificationItem[];
  skillCategories: SkillCategory[];
  languages: LanguageItem[];
  projects: ProjectItem[];
}

export interface DesignSettings {
  theme: ThemePalette;
  layout: LayoutVariant;
  sidebarStyle: SidebarStyle;
  fontSize: 'compact' | 'normal' | 'relaxed';
  highlightActionVerbs: boolean;
}
