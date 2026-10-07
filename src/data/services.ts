import { ServiceItem, ImportStep } from '@/types';

export const SERVICES_DATA: ServiceItem[] = [
  {
    id: 'importaciones',
    title: 'Importación y Compras Internacionales',
    shortDescription:
      'Realizamos importaciones de maquinaria, repuestos, accesorios y productos de diferentes sectores, coordinando todo el proceso de compra internacional.',
    fullDescription:
      'Coordinamos el proceso completo de compra e importación de maquinaria, repuestos, accesorios y productos de diversos sectores productivos. Gestionamos la relación con fabricantes y distribuidores internacionales en Asia, Norteamérica y Europa, asegurando calidad, especificaciones y precios competitivos.',
    iconName: 'Ship',
    image: '/images/service-maritime.jpg',
    features: [
      'Importación de maquinaria, repuestos, accesorios y productos multissectoriales',
      'Coordinación integral de la compra internacional con fabricantes',
      'Modalidades de contenedor completo (FCL) y carga consolidada (LCL)',
      'Gestión documental y verificación de especificaciones de fábrica',
    ],
    benefits: [
      'Acceso directo a proveedores globales verificados',
      'Precios de origen sin intermediarios especulativos',
      'Seguridad en cada transacción comercial internacional',
    ],
  },
  {
    id: 'asesoria',
    title: 'Asesoría en Comercio Exterior y Negociación',
    shortDescription:
      'Asesoría integral en comercio exterior, búsqueda y negociación con proveedores internacionales para compras seguras y rentables.',
    fullDescription:
      'Brindamos consultoría estratégica para conectar su empresa con las mejores oportunidades del mercado global. Nos encargamos de la búsqueda rigurosa de proveedores, evaluación de antecedentes, negociación de condiciones comerciales y asesoría en Incoterms para optimizar cada presupuesto.',
    iconName: 'Briefcase',
    image: '/images/service-consulting.jpg',
    features: [
      'Búsqueda y homologación de proveedores internacionales confiables',
      'Negociación de precios, plazos y condiciones comerciales ventajosas',
      'Estructuración técnica de costos y presupuestos de importación',
      'Asesoría en términos internacionales de comercio (Incoterms 2020)',
    ],
    benefits: [
      'Minimización de riesgos comerciales y fraudes en el extranjero',
      'Ahorro sustancial mediante negociación directa de volumen',
      'Toma de decisiones respaldada por especialistas en comercio exterior',
    ],
  },
  {
    id: 'logistica-transporte',
    title: 'Logística Internacional y Transporte Multimodal',
    shortDescription:
      'Transporte marítimo, aéreo y terrestre con monitoreo permanente desde el origen hasta el destino final de sus mercancías.',
    fullDescription:
      'Diseñamos soluciones logísticas integrales adaptadas a la envergadura y urgencia de su carga. Coordinamos fletes marítimos, envíos aéreos express y transporte terrestre nacional e interprovincial con rastreo continuo y estándares rigurosos de resguardo.',
    iconName: 'Truck',
    image: '/images/service-land.jpg',
    features: [
      'Transporte marítimo en contenedor completo (FCL) y carga suelta (LCL)',
      'Transporte aéreo prioritario para repuestos e insumos urgentes',
      'Transporte terrestre con unidades monitoreadas por GPS',
      'Coordinación de rutas multimodales puerta a puerta',
    ],
    benefits: [
      'Tiempos de tránsito optimizados para cada necesidad operativa',
      'Trazabilidad e informes continuos sobre el estado del embarque',
      'Pólizas de seguro y resguardo integral durante todo el trayecto',
    ],
  },
  {
    id: 'aduanas',
    title: 'Aduanas y Nacionalización de Mercancías',
    shortDescription:
      'Agenciamiento aduanero especializado para una nacionalización ágil, correcta clasificación arancelaria y cumplimiento tributario.',
    fullDescription:
      'Gestionamos todos los trámites aduaneros y la nacionalización oportuna de sus mercancías. Clasificamos técnicamente maquinaria, repuestos y productos diversos, gestionamos permisos sectoriales y aplicamos regímenes aduaneros convenientes para evitar multas y sobrecostos de almacenaje.',
    iconName: 'FileCheck',
    image: '/images/service-customs.jpg',
    features: [
      'Despacho aduanero anticipado, urgente y excepcional',
      'Clasificación arancelaria especializada de repuestos y maquinaria',
      'Liquidación precisa de tributos y aranceles de importación',
      'Tramitación de permisos especiales ante entidades reguladoras',
    ],
    benefits: [
      'Nacionalización ágil sin demoras ni sobrecostos de almacenaje',
      'Retiro oportuno para mantener la continuidad de su operación',
      'Tranquilidad con total apego a la legislación aduanera',
    ],
  },
  {
    id: 'repuestos-maquinaria',
    title: 'Comercialización de Maquinaria y Repuestos',
    shortDescription:
      'Comercializamos maquinaria pesada, repuestos y componentes originales y certificados para minería, construcción y sectores afines.',
    fullDescription:
      'Comercializamos maquinaria pesada, componentes y repuestos de alta durabilidad para equipos de minería y construcción. Suministramos piezas originales OEM y alternativas certificadas para motores, sistemas hidráulicos, tren de rodaje y herramientas de corte compatibles con las principales marcas.',
    iconName: 'Cog',
    image: '/images/service-machinery-parts.jpg',
    features: [
      'Venta y suministro de maquinaria pesada y equipos industriales',
      'Repuestos y componentes para motores diésel y sistemas hidráulicos',
      'Tren de rodaje, cadenas, rodillos y ruedas guía',
      'Herramientas de corte (GET), cuchillas y dientes de cucharón',
    ],
    benefits: [
      'Compatibilidad garantizada por Part Number y modelo',
      'Componentes testeados para resistir condiciones severas de trabajo',
      'Despacho inmediato a obras y faenas en todo el país',
    ],
  },
  {
    id: 'acompanamiento',
    title: 'Acompañamiento de Extremo a Extremo',
    shortDescription:
      'Acompañamos a cada cliente desde la cotización y selección del proveedor hasta la entrega final, con soluciones seguras y eficientes.',
    fullDescription:
      'Acompañamos a cada cliente de manera cercana y personalizada a lo largo de todo el ciclo operativo: desde la cotización inicial y selección del proveedor idóneo, hasta la nacionalización y entrega final en sus instalaciones, ofreciendo soluciones seguras, eficientes y adaptadas a cada necesidad.',
    iconName: 'Warehouse',
    image: '/images/service-air.jpg',
    features: [
      'Atención personalizada con seguimiento de un asesor asignado',
      'Acompañamiento integral desde la cotización hasta la recepción',
      'Validación de especificaciones técnicas y documentación comercial',
      'Soluciones logísticas adaptadas a la necesidad de cada proyecto',
    ],
    benefits: [
      'Un solo punto de contacto responsable de toda la operación',
      'Comunicación fluida y respuestas claras en todo momento',
      'Garantía de entrega segura y con total conformidad',
    ],
  },
];

export const IMPORT_PROCESS_STEPS: ImportStep[] = [
  {
    step: 1,
    title: 'Asesoría y Planificación',
    description:
      'Análisis de necesidades, búsqueda de proveedores, cotización y comparativa, y asesoría en normativas y costos.',
    iconName: 'FileSpreadsheet',
    durationEstimate: 'Paso 01',
  },
  {
    step: 2,
    title: 'Compra en Origen',
    description:
      'Contacto con proveedores confiables, verificación de calidad, gestión de pagos internacionales y coordinación de producción y despacho.',
    iconName: 'CheckSquare',
    durationEstimate: 'Paso 02',
  },
  {
    step: 3,
    title: 'Transporte Internacional',
    description:
      'Coordinación de embarque marítimo, aéreo o terrestre, gestión de documentos (BL, AWB), seguimiento en tiempo real y seguro de carga.',
    iconName: 'Navigation',
    durationEstimate: 'Paso 03',
  },
  {
    step: 4,
    title: 'Arribo y Aduana',
    description:
      'Tramitación aduanera, clasificación arancelaria (HS Code), cálculo y pago de tributos (IVA, FODINFA, aranceles) y gestión documental.',
    iconName: 'ShieldCheck',
    durationEstimate: 'Paso 04',
  },
  {
    step: 5,
    title: 'Transporte Nacional',
    description:
      'Coordinación de transporte interno a cualquier ciudad del Ecuador, almacenamiento temporal si es necesario y entrega en sitio.',
    iconName: 'Truck',
    durationEstimate: 'Paso 05',
  },
  {
    step: 6,
    title: 'Entrega Final',
    description:
      'Recepción del producto, verificación de cantidad y estado, entrega al cliente final y soporte postventa.',
    iconName: 'MapPin',
    durationEstimate: 'Paso 06',
  },
];

export const SERVICE_BENEFITS = [
  {
    title: 'Trazabilidad 360°',
    description: 'Acceso a reportes diarios del estatus de su carga y tiempos estimados de llegada.',
    iconName: 'Eye',
  },
  {
    title: 'Gestión Documental Cero Errores',
    description: 'Revisión minuciosa de facturas comerciales, listas de empaque y certificados de origen.',
    iconName: 'FileText',
  },
  {
    title: 'Red de Agentes Mundiales',
    description: 'Corresponsales directos en puertos de China, Estados Unidos, Europa y Latinoamérica.',
    iconName: 'Globe',
  },
  {
    title: 'Tarifas Negociadas por Volumen',
    description: 'Convenios preferenciales con armadores marítimos y aerolíneas de carga.',
    iconName: 'Percent',
  },
];
