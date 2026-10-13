export interface CompanyData {
  name: string;
  legalName: string;
  tagline: string;
  slogan: string;
  description: string;
  yearsOfExperience: number;
  phone: string;
  phoneDisplay: string;
  phoneSecondary: string;
  phoneSecondaryDisplay: string;
  phoneSales: string;
  phoneSalesDisplay: string;
  whatsappNumber: string;
  whatsappDisplay: string;
  whatsappQuotesNumber: string;
  whatsappQuotesDisplay: string;
  whatsappSalesNumber: string;
  whatsappSalesDisplay: string;
  email: string;
  emailSales: string;
  address: string;
  addressCity: string;
  addressCountry: string;
  scheduleWeekdays: string;
  scheduleSaturday: string;
  social: {
    facebook: string;
    tiktok: string;
    instagram: string;
    whatsapp: string;
    whatsappQuotes: string;
    whatsappContact: string;
  };
  stats: {
    successfulShipments: number;
    countriesCovered: number;
    catalogParts: number;
    satisfiedClients: number;
  };
  whyChooseUsChecklist: Array<{
    title: string;
    description: string;
  }>;
  mapsUrl: string;
  mapsEmbedUrl: string;
}

export const COMPANY_DATA: CompanyData = {
  name: 'Valle Logistics and Import',
  legalName: 'Valle Logistics & Import',
  tagline: 'Importaciones, Comercio Exterior, Logística Internacional & Maquinaria',
  slogan: 'Conectamos oportunidades, movemos tu futuro',
  description:
    'Somos una empresa ecuatoriana especializada en importaciones y soluciones logísticas, comprometida con conectar a nuestros clientes con proveedores y productos confiables a nivel internacional. Nuestra experiencia se centra en la importación de maquinaria, repuestos, partes y accesorios para vehículos de carga pesada y maquinaria, además de la gestión de importaciones de todo tipo de productos.',
  yearsOfExperience: 15,

  // Teléfonos (Contactos, Cotizaciones y Ventas)
  phone: '+593979796220',
  phoneDisplay: '0979796220',
  phoneSecondary: '+593981123132',
  phoneSecondaryDisplay: '0981123132',
  phoneSales: '+593978998252',
  phoneSalesDisplay: '0978998252',

  // WhatsApp (Directo / Central: 0979796220 | Cotizaciones: 0981123132 | Ventas: 0978998252)
  whatsappNumber: '593979796220',
  whatsappDisplay: '0979796220',
  whatsappQuotesNumber: '593981123132',
  whatsappQuotesDisplay: '0981123132',
  whatsappSalesNumber: '593978998252',
  whatsappSalesDisplay: '0978998252',

  // Emails
  email: 'vallelogistics01@gmail.com',
  emailSales: 'vallelogistics01@gmail.com',

  // Ubicación
  address: 'Edmundo Granda Ugalde',
  addressCity: 'Cuenca',
  addressCountry: 'Ecuador',

  // Horarios de atención
  scheduleWeekdays: 'Lun - Vie: 8:00 AM - 6:30 PM',
  scheduleSaturday: 'Sáb: 8:30 AM - 1:00 PM',

  // Redes Sociales
  social: {
    facebook: 'https://www.facebook.com/share/1VREEr7f1U/',
    tiktok: 'https://www.tiktok.com/@importadora.valle7',
    instagram: 'https://instagram.com/vallelogisticsimportadora?utm_source=qr&psln=MXF6cm5tdHd1MnYxaA==',
    whatsapp: 'https://wa.me/593979796220',
    whatsappQuotes: 'https://wa.me/593981123132',
    whatsappContact: 'https://wa.me/593979796220',
  },

  // Cifras / Estadísticas
  stats: {
    successfulShipments: 12500,
    countriesCovered: 38,
    catalogParts: 4500,
    satisfiedClients: 1850,
  },

  // 6 Puntos clave (2 columnas) alineados a lo que la empresa realiza
  whyChooseUsChecklist: [
    {
      title: 'Acompañamiento de Extremo a Extremo',
      description: 'Acompañamos a cada cliente desde la cotización y selección de proveedor hasta la entrega final.',
    },
    {
      title: 'Búsqueda y Negociación con Proveedores',
      description: 'Gestión comercial directa con fabricantes globales para obtener las mejores condiciones.',
    },
    {
      title: 'Logística y Transporte Multimodal',
      description: 'Coordinación eficiente de fletes marítimos, aéreos y terrestres con monitoreo continuo.',
    },
    {
      title: 'Aduanas y Nacionalización Ágil',
      description: 'Gestión aduanera integral para evitar sobrecostos y asegurar retiro oportuno de mercancías.',
    },
    {
      title: 'Maquinaria Pesada y Repuestos',
      description: 'Comercialización de maquinaria, componentes y repuestos garantizados para trabajo pesado.',
    },
    {
      title: 'Soluciones Seguras y a Medida',
      description: 'Asesoría en comercio exterior adaptada con precisión a la necesidad de cada proyecto.',
    },
  ],

  // Enlace directo y mapa embebido de Google Maps (Cuenca, Ecuador)
  mapsUrl: 'https://maps.app.goo.gl/WNX4BpRMmSHdPvn8A?g_st=iwb',
  mapsEmbedUrl:
    'https://maps.google.com/maps?q=Edmundo+Granda+Ugalde,+Cuenca,+Ecuador&t=&z=16&ie=UTF8&iwloc=&output=embed',
};

export const getWhatsAppLink = (
  message: string,
  targetNumber: string = COMPANY_DATA.whatsappNumber
): string => {
  const encoded = encodeURIComponent(message);
  return `https://wa.me/${targetNumber}?text=${encoded}`;
};

export const getQuoteWhatsAppLink = (message: string): string => {
  return getWhatsAppLink(message, COMPANY_DATA.whatsappQuotesNumber);
};

export const getProductWhatsAppLink = (productName: string, sku: string): string => {
  const text = `Hola Valle Logistics, deseo cotizar el repuesto: ${productName} (SKU: ${sku}). Por favor indíquenme disponibilidad y precio.`;
  return getQuoteWhatsAppLink(text);
};

