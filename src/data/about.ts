import { TeamMember, BrandPartner } from '@/types';

export const MISSION_VISION_VALUES = {
  mission: {
    title: 'Nuestra Misión',
    description:
      'Proveer soluciones integrales en importaciones de maquinaria, repuestos, accesorios y productos multissectoriales, brindando asesoría estratégica en comercio exterior, logística y aduanas, con un acompañamiento continuo desde la cotización hasta la entrega final.',
  },
  vision: {
    title: 'Nuestra Visión',
    description:
      'Ser el aliado estratégico líder en importaciones, comercio exterior y comercialización de maquinaria y repuestos, distinguiéndonos por la transparencia en la negociación internacional, eficiencia aduanera y soluciones adaptadas a cada necesidad.',
  },
  values: [
    {
      title: 'Integridad y Transparencia',
      description: 'Claridad absoluta en costos, negociación con proveedores y condiciones operativas.',
    },
    {
      title: 'Acompañamiento de Principio a Fin',
      description: 'Caminamos junto a cada cliente desde la selección del fabricante hasta la entrega final en destino.',
    },
    {
      title: 'Seguridad y Eficiencia Operativa',
      description: 'Estándares rigurosos en transporte multimodal y nacionalización ágil de mercancías.',
    },
    {
      title: 'Soluciones Adaptadas a la Medida',
      description: 'Diseñamos estrategias comerciales y logísticas a la medida exacta de cada proyecto e industria.',
    },
  ],
};

export const TEAM_MEMBERS: TeamMember[] = [
  {
    id: 'team-1',
    name: 'Ing. Carlos Mendoza Valle', // [REEMPLAZAR_MIEMBRO_1]
    role: 'Director General & Fundador',
    image: '/images/team-1.jpg',
    experience: '18+ años en Comercio Exterior y Supply Chain',
  },
  {
    id: 'team-2',
    name: 'Lic. Mariana Paredes', // [REEMPLAZAR_MIEMBRO_2]
    role: 'Gerente de Operaciones Aduaneras',
    image: '/images/team-2.jpg',
    experience: '14+ años en Agenciamiento de Carga y Aduanas',
  },
  {
    id: 'team-3',
    name: 'Ing. Roberto Alarcón', // [REEMPLAZAR_MIEMBRO_3]
    role: 'Jefe de División Repuestos y Maquinaria',
    image: '/images/team-3.jpg',
    experience: '12+ años en Mantenimiento de Maquinaria Pesada',
  },
  {
    id: 'team-4',
    name: 'Valeria Quispe', // [REEMPLAZAR_MIEMBRO_4]
    role: 'Líder de Servicio al Cliente & Trazabilidad',
    image: '/images/team-4.jpg',
    experience: '8+ años en Logística Internacional y Customer Care',
  },
];

export const BRAND_PARTNERS: BrandPartner[] = [
  { id: 'b1', name: 'LogistiCore Global', logo: '/images/brand-1.svg', category: 'Naviera & Carga' },
  { id: 'b2', name: 'FreightEx Solutions', logo: '/images/brand-2.svg', category: 'Transporte Aéreo' },
  { id: 'b3', name: 'Cargoway Worldwide', logo: '/images/brand-3.svg', category: 'Multimodal' },
  { id: 'b4', name: 'TransWorld Shipping', logo: '/images/brand-4.svg', category: 'Naviera Internacional' },
  { id: 'b5', name: 'ShipMaster Express', logo: '/images/brand-5.svg', category: 'Courier Industrial' },
  { id: 'b6', name: 'InterPort Logistics', logo: '/images/brand-6.svg', category: 'Terminal de Almacenamiento' },
];

export const CERTIFICATIONS = [
  {
    title: 'Operador Económico Autorizado (OEA)',
    subtitle: 'Certificación de seguridad en la cadena logística internacional',
    badge: 'OEA Certified',
  },
  {
    title: 'Gestión de Calidad ISO 9001:2015',
    subtitle: 'Garantía en procesos estandarizados y satisfacción del cliente',
    badge: 'ISO 9001',
  },
  {
    title: 'Alianza BASC',
    subtitle: 'Comercio seguro y prevención de riesgos operacionales',
    badge: 'BASC Member',
  },
  {
    title: 'Red IATA Cargo Agent',
    subtitle: 'Acreditación para emisión directa y reserva aérea preferente',
    badge: 'IATA Cargo',
  },
];
