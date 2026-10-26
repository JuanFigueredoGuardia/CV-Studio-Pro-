import { CVData } from '../types/cv';

export const techLeadProfile: CVData = {
  profile: {
    name: 'Juan Carlos Figueredo',
    targetRole: 'Senior Full-Stack & Cloud Solutions Lead',
    bio: 'Ingeniero de Software Senior con más de 8 años de trayectoria liderando el diseño y escalamiento de arquitecturas cloud nativas de alto rendimiento. Especializado en ecosistemas React, TypeScript, Node.js y plataformas en la nube (AWS/GCP). Apasionado por la optimización de procesos CI/CD, buenas prácticas arquitectónicas y la mentoría de equipos multidisciplinarios orientados a la entrega de valor medible.',
    email: 'juanfigueredoguardia@gmail.com',
    phone: '+34 612 345 678',
    location: 'Madrid, España (Disponible Remoto)',
    website: 'https://juanfigueredo.dev',
    linkedin: 'https://linkedin.com/in/juan-figueredo',
    github: 'https://github.com/juanfigueredo',
    photoUrl: '/src/assets/images/avatar_tech_lead_1792986076800.jpg',
    showPhoto: true,
    showQrCode: true,
  },
  experience: [
    {
      id: 'exp-1',
      role: 'Tech Lead & Senior Software Architect',
      company: 'Novatech Enterprise Systems',
      location: 'Madrid, España',
      startDate: '2023 - 03',
      endDate: 'Presente',
      isCurrent: true,
      employmentType: 'Tiempo Completo',
      summary: 'Liderazgo técnico de un equipo distribuido de 12 ingenieros en la modernización de servicios core bancarios y transaccionales.',
      achievements: [
        'Arquitectó y lideró la migración de microfrontends React/TypeScript, reduciendo el tiempo de carga inicial en un 44% para más de 1.8M de usuarios activos mensuales.',
        'Optimizó pipelines de despliegue continuo con Kubernetes y Docker, disminuyendo los incidentes en producción en un 60% y reduciendo el ciclo de release de semanas a horas.',
        'Implementó patrones de observabilidad distribuida con OpenTelemetry, elevando el SLA de disponibilidad al 99.98% en servicios de alta concurrencia.',
        'Mentoreó a 6 ingenieros mid-level, impulsando la adopción de arquitecturas desacopladas y pruebas automatizadas (cobertura >85%).'
      ],
      technologies: ['React 19', 'TypeScript', 'Node.js', 'Go', 'Kubernetes', 'PostgreSQL', 'AWS']
    },
    {
      id: 'exp-2',
      role: 'Senior Full-Stack Developer',
      company: 'Global Fintech Ventures',
      location: 'Barcelona, España (Remoto)',
      startDate: '2020 - 06',
      endDate: '2023 - 02',
      isCurrent: false,
      employmentType: 'Remoto',
      summary: 'Desarrollo de módulos de pagos y conciliación bancaria en tiempo real.',
      achievements: [
        'Diseñó e implementó microservicios basados en eventos con Kafka y Redis, procesando más de 150,000 transacciones diarias con latencia p99 inferior a 80ms.',
        'Desarrolló el portal financiero para clientes corporativos con Next.js y Tailwind CSS, incrementando el Net Promoter Score (NPS) del producto en 28 puntos.',
        'Refactorizó el stack de seguridad OAuth2 / OpenID Connect garantizando cumplimiento normativo PCI-DSS y SOC2.'
      ],
      technologies: ['React', 'Next.js', 'TypeScript', 'Express', 'Kafka', 'Redis', 'Docker']
    },
    {
      id: 'exp-3',
      role: 'Full-Stack Software Engineer',
      company: 'InnoLab Studio',
      location: 'Valencia, España',
      startDate: '2017 - 09',
      endDate: '2020 - 05',
      isCurrent: false,
      employmentType: 'Tiempo Completo',
      summary: 'Creación de aplicaciones SaaS escalables para el sector retail y logística.',
      achievements: [
        'Construyó desde cero la plataforma de gestión de inventarios y tracking en tiempo real utilizada por más de 40 empresas mayoristas.',
        'Automatizó procesos de extracción y sincronización ETL, ahorrando más de 20 horas de trabajo manual semanal a los equipos de operaciones.',
        'Diseñó componentes reutilizables de UI con sistema de diseño accesible según estándares WCAG 2.1 AA.'
      ],
      technologies: ['JavaScript ES6+', 'React', 'Node.js', 'MongoDB', 'REST APIs', 'Jest']
    }
  ],
  education: [
    {
      id: 'edu-1',
      degree: 'Grado en Ingeniería Informática del Software',
      institution: 'Universidad Politécnica de Madrid',
      location: 'Madrid, España',
      startDate: '2013',
      endDate: '2017',
      honorsOrGpa: 'Matrícula de Honor en Proyecto de Fin de Grado',
      details: 'Especialización en Sistemas Distribuidos, Algoritmos Avanzados y Seguridad Informática.'
    },
    {
      id: 'edu-2',
      degree: 'Máster en Arquitectura de Software y Cloud Computing',
      institution: 'Universidad Rey Juan Carlos / Tech Institute',
      location: 'Madrid, España',
      startDate: '2018',
      endDate: '2019',
      honorsOrGpa: 'Distinción de Excelencia Académica',
      details: 'Enfoque en microservicios, serverless, CI/CD y diseño guiado por el dominio (DDD).'
    }
  ],
  certifications: [
    {
      id: 'cert-1',
      name: 'AWS Certified Solutions Architect – Professional (SAP-C02)',
      issuer: 'Amazon Web Services',
      issueDate: '2024 - 05',
      credentialId: 'AWS-PSA-993821',
      credentialUrl: 'https://aws.amazon.com/verification'
    },
    {
      id: 'cert-2',
      name: 'Google Cloud Certified Professional Cloud Architect',
      issuer: 'Google Cloud Platform',
      issueDate: '2023 - 11',
      credentialId: 'GCP-PCA-449102',
      credentialUrl: 'https://cloud.google.com/certification'
    },
    {
      id: 'cert-3',
      name: 'Certified Kubernetes Administrator (CKA)',
      issuer: 'Cloud Native Computing Foundation (CNCF)',
      issueDate: '2023 - 04',
      credentialId: 'CKA-882190',
      credentialUrl: 'https://www.cncf.io/certification/cka'
    },
    {
      id: 'cert-4',
      name: 'Professional Scrum Master™ I (PSM I)',
      issuer: 'Scrum.org',
      issueDate: '2022 - 08',
      credentialId: 'PSM-552199',
      credentialUrl: 'https://scrum.org/certificates'
    }
  ],
  skillCategories: [
    {
      id: 'cat-1',
      categoryName: 'Frontend & UI Engineering',
      skills: [
        { name: 'React 19 / Next.js', level: 'Experto', percent: 95 },
        { name: 'TypeScript', level: 'Experto', percent: 95 },
        { name: 'Tailwind CSS & Design Systems', level: 'Experto', percent: 90 },
        { name: 'State Management & WebSockets', level: 'Avanzado', percent: 88 },
        { name: 'Accesibilidad Web (WCAG AAA)', level: 'Avanzado', percent: 85 }
      ]
    },
    {
      id: 'cat-2',
      categoryName: 'Backend & Cloud Infrastructure',
      skills: [
        { name: 'Node.js & Express / NestJS', level: 'Experto', percent: 92 },
        { name: 'Arquitecturas Cloud (AWS & GCP)', level: 'Experto', percent: 90 },
        { name: 'PostgreSQL & Modelado de Datos', level: 'Avanzado', percent: 88 },
        { name: 'Docker & Kubernetes', level: 'Avanzado', percent: 85 },
        { name: 'Kafka & Message Queues', level: 'Intermedio', percent: 78 }
      ]
    },
    {
      id: 'cat-3',
      categoryName: 'Liderazgo & Metodologías',
      skills: [
        { name: 'Liderazgo Técnico & Mentoring', level: 'Experto', percent: 92 },
        { name: 'Diseño Basado en Dominio (DDD)', level: 'Avanzado', percent: 85 },
        { name: 'CI/CD & DevOps Automation', level: 'Avanzado', percent: 88 },
        { name: 'Metodologías Ágiles (Scrum / Kanban)', level: 'Experto', percent: 90 }
      ]
    }
  ],
  languages: [
    { id: 'lang-1', language: 'Español', proficiency: 'Nativo' },
    { id: 'lang-2', language: 'Inglés', proficiency: 'Profesional Avanzado (C1)' },
    { id: 'lang-3', language: 'Portugués', proficiency: 'Intermedio (B2)' }
  ],
  projects: [
    {
      id: 'proj-1',
      name: 'OmniStream Cloud Gateway',
      role: 'Arquitecto Principal & Creador',
      description: 'Gateway de microservicios con balanceo inteligente de tráfico, rate-limiting distribuido y autenticación JWT con más de 12k estrellas en GitHub.',
      liveUrl: 'https://omnistream.dev',
      githubUrl: 'https://github.com/juanfigueredo/omnistream',
      impactMetric: 'Reduce latencia p99 en 35% y soporta 50k req/s',
      tags: ['TypeScript', 'Go', 'Redis', 'Docker']
    },
    {
      id: 'proj-2',
      name: 'Enterprise Design Token Engine',
      role: 'Lead Developer',
      description: 'Librería multiplataforma para sincronizar tokens de Figma hacia Web (CSS/Tailwind) y Mobile (React Native/Swift) de forma totalmente automatizada.',
      liveUrl: 'https://designtokens.studio',
      githubUrl: 'https://github.com/juanfigueredo/token-engine',
      impactMetric: 'Adoptado por más de 15 equipos corporativos',
      tags: ['React', 'AST Parser', 'Tailwind CSS', 'Figma API']
    }
  ]
};

export const designerProfile: CVData = {
  profile: {
    name: 'Elena Morales Valenzuela',
    targetRole: 'Lead Product Designer & Design Systems Specialist',
    bio: 'Product Designer Senior con más de 7 años de experiencia construyendo experiencias de usuario de clase mundial, sistemas de diseño escalables y productos B2B SaaS complejos. Enfoque riguroso en accesibilidad, investigación centrada en el usuario y alineación estratégica con objetivos de negocio.',
    email: 'elena.morales@designlead.io',
    phone: '+34 699 876 543',
    location: 'Barcelona, España',
    website: 'https://elenamorales.design',
    linkedin: 'https://linkedin.com/in/elena-morales-ux',
    github: 'https://github.com/elenamorales',
    photoUrl: '/src/assets/images/avatar_product_engineer_1792986076261.jpg',
    showPhoto: true,
    showQrCode: true,
  },
  experience: [
    {
      id: 'exp-d1',
      role: 'Staff Product Designer & Design System Lead',
      company: 'Aura Fintech Platform',
      location: 'Barcelona, España',
      startDate: '2022 - 01',
      endDate: 'Presente',
      isCurrent: true,
      employmentType: 'Tiempo Completo',
      summary: 'Dirección del sistema de diseño unificado multi-marca para más de 12 productos financieros.',
      achievements: [
        'Estandarizó la librería de componentes Figma y tokens de diseño, acelerando el time-to-market de nuevas features en un 40% para 4 squads de ingeniería.',
        'Rediseñó el flujo de onboarding bancario de empresas, aumentando la tasa de conversión en un 23% e incrementando el volumen de cuentas activas en 450k€ en el Q1.',
        'Dirigió auditorías de accesibilidad WCAG 2.2 nivel AAA, garantizando cumplimiento normativo europeo para el 100% de los flujos críticos.'
      ],
      technologies: ['Figma', 'Design Tokens', 'Design Systems', 'User Research', 'React Prototyping']
    },
    {
      id: 'exp-d2',
      role: 'Senior UI/UX Designer',
      company: 'Krypton SaaS Analytics',
      location: 'Remoto (Madrid / Londres)',
      startDate: '2019 - 04',
      endDate: '2021 - 12',
      isCurrent: false,
      employmentType: 'Remoto',
      summary: 'Diseño integral de cuadros de mando y analítica predictiva en tiempo real.',
      achievements: [
        'Condujo más de 60 entrevistas y tests de usabilidad con líderes de IT en Fortune 500, traduciendo datos cualitativos en una interfaz minimalista de alta retención.',
        'Redujo la tasa de abandono de tareas de configuración compleja del 34% al 8% mediante flujos progresivos asistidos.',
        'Estableció el framework de métricas de experiencia (HEART framework) integrado en los dashboards de telemetría de producto.'
      ],
      technologies: ['Figma', 'Miro', 'Hotjar', 'Mixpanel', 'Storybook']
    }
  ],
  education: [
    {
      id: 'edu-d1',
      degree: 'Grado en Diseño Multimedia y Comunicación Visual',
      institution: 'Universitat Oberta de Catalunya (UOC)',
      location: 'Barcelona, España',
      startDate: '2014',
      endDate: '2018',
      honorsOrGpa: 'Premio Extraordinario de Titulación',
      details: 'Enfoque en Usabilidad, Arquitectura de la Información y Psicología Cognitiva aplicada a interfaces.'
    }
  ],
  certifications: [
    {
      id: 'cert-d1',
      name: 'Nielsen Norman Group UX Master Certified',
      issuer: 'Nielsen Norman Group (NN/g)',
      issueDate: '2023 - 03',
      credentialId: 'NNG-UX-104992',
      credentialUrl: 'https://nngroup.com/ux-certification'
    },
    {
      id: 'cert-d2',
      name: 'Certified Accessibility Specialist (WAS / CPACC)',
      issuer: 'IAAP (International Association of Accessibility Professionals)',
      issueDate: '2022 - 09',
      credentialId: 'IAAP-883921',
      credentialUrl: 'https://accessibilityassociation.org'
    }
  ],
  skillCategories: [
    {
      id: 'cat-d1',
      categoryName: 'Diseño de Producto & Sistemas',
      skills: [
        { name: 'Sistemas de Diseño & Figma Tokens', level: 'Experto', percent: 98 },
        { name: 'Arquitectura de Información & Wireframing', level: 'Experto', percent: 94 },
        { name: 'Prototipado Interactivo de Alta Fidelidad', level: 'Avanzado', percent: 90 },
        { name: 'Accesibilidad Digital (WCAG 2.2 AAA)', level: 'Experto', percent: 95 }
      ]
    },
    {
      id: 'cat-d2',
      categoryName: 'Investigación & Métricas UX',
      skills: [
        { name: 'User Testing & Pruebas Heurísticas', level: 'Avanzado', percent: 90 },
        { name: 'Métricas HEART & SUS', level: 'Avanzado', percent: 86 },
        { name: 'Design Thinking & Workshops Co-Creación', level: 'Experto', percent: 92 }
      ]
    }
  ],
  languages: [
    { id: 'lang-d1', language: 'Español', proficiency: 'Nativo' },
    { id: 'lang-d2', language: 'Inglés', proficiency: 'Bilingüe (C2)' },
    { id: 'lang-d3', language: 'Catalán', proficiency: 'Bilingüe (C2)' }
  ],
  projects: [
    {
      id: 'proj-d1',
      name: 'Prisma Design System (Open Source)',
      role: 'Diseñadora y Arquitecta de Tokens',
      description: 'Librería UI accesible con más de 120 componentes testeados con lectores de pantalla y soporte nativo multi-tema.',
      liveUrl: 'https://prismadesign.org',
      impactMetric: '+15k descargas mensuales en NPM',
      tags: ['Figma', 'Tokens', 'WCAG AAA', 'Tailwind']
    }
  ]
};

export const emptyProfile: CVData = {
  profile: {
    name: 'Nombre Apellido',
    targetRole: 'Puesto Objetivo o Especialidad',
    bio: 'Resumen profesional conciso destacando tus fortalezas, experiencia clave y valor diferenciador orientado a resultados.',
    email: 'tu.email@ejemplo.com',
    phone: '+34 600 000 000',
    location: 'Ciudad, País',
    website: 'https://tuportfolio.com',
    linkedin: 'https://linkedin.com/in/tu-perfil',
    github: 'https://github.com/tu-usuario',
    photoUrl: '/src/assets/images/avatar_tech_lead_1792986076800.jpg',
    showPhoto: true,
    showQrCode: false,
  },
  experience: [
    {
      id: 'exp-empty-1',
      role: 'Puesto o Cargo Reciente',
      company: 'Empresa u Organización',
      location: 'Ciudad, Modalidad',
      startDate: '2023 - 01',
      endDate: 'Presente',
      isCurrent: true,
      employmentType: 'Tiempo Completo',
      summary: 'Descripción breve del alcance del puesto y equipo a cargo.',
      achievements: [
        'Lideró la implementación de una nueva solución que incrementó la eficiencia operativa en un 30%.',
        'Optimizó procesos reduciendo costos de infraestructura en 15% mediante automatizaciones.'
      ],
      technologies: ['Tecnología 1', 'Tecnología 2', 'Herramienta 3']
    }
  ],
  education: [
    {
      id: 'edu-empty-1',
      degree: 'Grado o Licenciatura',
      institution: 'Universidad o Instituto',
      location: 'Ciudad, País',
      startDate: '2018',
      endDate: '2022',
      details: 'Menciones académicas, especialidad o logros relevantes.'
    }
  ],
  certifications: [
    {
      id: 'cert-empty-1',
      name: 'Certificación Profesional Relevante',
      issuer: 'Entidad Emisora',
      issueDate: '2023 - 06',
      credentialId: 'CERT-12345',
      credentialUrl: 'https://ejemplo.com'
    }
  ],
  skillCategories: [
    {
      id: 'cat-empty-1',
      categoryName: 'Habilidades Técnicas Principales',
      skills: [
        { name: 'Habilidad 1', level: 'Avanzado', percent: 85 },
        { name: 'Habilidad 2', level: 'Avanzado', percent: 80 }
      ]
    }
  ],
  languages: [
    { id: 'lang-empty-1', language: 'Español', proficiency: 'Nativo' },
    { id: 'lang-empty-2', language: 'Inglés', proficiency: 'Profesional Avanzado (C1)' }
  ],
  projects: []
};
