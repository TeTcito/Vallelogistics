export type ProductTag = 'Nuevo' | 'Más vendido' | 'Oferta' | 'Próximamente';

export interface Product {
  id: string;
  name: string;
  category: string;
  subcategory: string;
  brand: string;
  sku: string;
  image: string;
  compatibility: string[];
  tag?: ProductTag;
  price?: number;
  rating?: number;
  description?: string;
  stockStatus?: 'Disponible' | 'Bajo pedido' | 'Consultar' | 'Próximamente';
}

export interface ServiceItem {
  id: string;
  title: string;
  shortDescription: string;
  fullDescription: string;
  iconName: string;
  image: string;
  features: string[];
  benefits: string[];
}

export interface TestimonialItem {
  id: string;
  author: string;
  role: string;
  company: string;
  comment: string;
  rating: number;
}

export interface StatisticItem {
  id: string;
  value: number;
  suffix: string;
  label: string;
  iconName: string;
}

export interface TeamMember {
  id: string;
  name: string;
  role: string;
  image: string;
  experience: string;
}

export interface FAQItem {
  id: string;
  question: string;
  answer: string;
  category?: string;
}

export interface BrandPartner {
  id: string;
  name: string;
  logo: string;
  category: string;
}

export interface ImportStep {
  step: number;
  title: string;
  description: string;
  iconName: string;
  durationEstimate?: string;
}
