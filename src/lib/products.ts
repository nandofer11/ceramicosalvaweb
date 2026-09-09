export type ProductGalleryItem =
  | { type: 'image'; src: string; alt: string }
  | { type: 'video'; poster: string; title: string; videoUrl: string };

export type Product = {
  id: string;
  name: string;
  image: string;
  category: 'Muros' | 'Techos';
  description: string;
  features: string[];
  applications: string[];
  specs: string[];
  gallery: ProductGalleryItem[];
  qualities: {
    primera: string[];
    segunda: string[];
  };
};

export const products: Product[] = [
  {
    id: 'pandereta',
    name: 'Pandereta rayas',
    category: 'Muros',
    image: '/images/pandereta.png',
    description:
      'Ideal para muros divisorios y cerramientos, se adapta a proyectos residenciales, comerciales e industriales.',
    features: [
      'Medidas: 11.9 x 13.5 x 23.5 cm',
      'Peso: 2.8 kg (aproximado)',
      'Rendimiento: 30 unidades por m²',
      'Alta resistencia térmica',
      'Buen aislamiento acústico',
    ],
    applications: ['Muros divisorios interiores', 'Tabiquería en general', 'Cerramientos no portantes'],
    specs: ['11.9 x 13.5 x 23.5 cm', '2.8 kg por pieza', '30 piezas por m²', 'Buena absorción acústica', 'Apto para muros no estructurales'],
    gallery: [
      { type: 'image', src: '/images/pandereta/pandereta1.jpg', alt: 'Pandereta primera' },
      { type: 'image', src: '/images/pandereta/pandereta3.jpg', alt: 'Pandereta primera' },
      { type: 'image', src: '/images/pandereta/pandereta_mitades.jpg', alt: 'Pandereta mitades' },
      { type: 'video', poster: '/images/pandereta/pandereta2.jpg', title: 'Pandereta primera', videoUrl: '/images/pandereta/pandereta_primera_video.mp4' },
      { type: 'video', poster: '/images/pandereta/pandereta_segunda_foto.jpeg', title: 'Pandereta segunda', videoUrl: '/images/pandereta/pandereta_segunda_video.mp4' },
    ],
    qualities: {
      primera: ['Buena cocción', 'Mantiene su geometría completa', 'Alta densidad y resistencia'],
      segunda: ['Pequeñas irregularidades estéticas', 'Precio más accesible', 'Ideal para obras económicas y muros tarrajeados'],
    },
  },
  {
    id: 'king-kong',
    name: 'King Kong 18 huecos',
    category: 'Muros',
    image: '/images/kingkong.png',
    description:
      'Perfecto para muros portantes. Proporciona alta resistencia sísmica y durabilidad para construcciones seguras.',
    features: [
      'Medidas: 8.9 x 11.6 x 22.6 cm',
      'Peso: 2.3 kg (aproximado)',
      'Rendimiento: 78 unidades por m²',
      'Alta resistencia a la compresión',
      'Excelente resistencia sísmica',
    ],
    applications: ['Muros portantes', 'Columnas estructurales', 'Construcciones de alta resistencia'],
    specs: ['8.9 x 11.6 x 22.6 cm', '2.3 kg por pieza', '78 piezas por m²', 'Alta resistencia sísmica', 'Uso estructural'],
    gallery: [
      { type: 'image', src: '/images/kkong/king_kong_primera.jpg', alt: 'King Kong 18 huecos primera' },
      { type: 'image', src: '/images/kkong/king_kong_primera2.jpg', alt: 'King Kong 18 huecos' },
      { type: 'video', poster: '/images/kkong/1.png', title: 'King Kong primera', videoUrl: '/images/kkong/1.mp4' },
      { type: 'video', poster: '/images/kkong/king_kong_primera2.jpg', title: 'King Kong 18 huecos primera', videoUrl: '/images/kkong/king_kong_primera_video.mp4' },
      { type: 'video', poster: '/images/kkong/king_kong_requemado1.jpeg', title: 'King Kong segunda requemados', videoUrl: '/images/kkong/video_requemados_king_kong.mp4' },
    ],
    qualities: {
      primera: ['Alta consistencia dimensional', 'Mejor desempeño estructural', 'Buena compactación'],
      segunda: ['Pequeñas agujas visibles', 'Precio económico', 'Buena para rellenos y muros auxiliares'],
    },
  },
  {
    id: 'techo-12',
    name: 'Techo 12',
    category: 'Techos',
    image: '/images/techo12.png',
    description:
      'Diseñado específicamente para losas aligeradas. Optimiza el peso de la estructura manteniendo la resistencia necesaria.',
    features: [
      'Medidas: 12 x 30 x 30 cm',
      'Peso: 6 kg (aproximado)',
      'Rendimiento: 9 unidades por m²',
      'Alta resistencia a la compresión',
      'Menor peso en la estructura',
    ],
    applications: ['Losas aligeradas', 'Techos de concreto armado', 'Entrepisos'],
    specs: ['12 x 30 x 30 cm', '6 kg por pieza', '9 piezas por m²', 'Menor peso estructural', 'Buena aislación térmica'],
    gallery: [
      { type: 'image', src: '/images/techo12/techo12.jpeg', alt: 'Techo 12' },
      { type: 'image', src: '/images/techo12/techo12-1.jpg', alt: 'Techo 12 en obra' },
      { type: 'image', src: '/images/techo12/2.jpeg', alt: 'Techo 12 en obra' },
      { type: 'video', poster: '/images/techo12/2.png', title: 'Techo 12 primera', videoUrl: '/images/techo12/2.mp4' },
      { type: 'video', poster: '/images/techo12/5.png', title: 'Techo 12 primera', videoUrl: '/images/techo12/5.mp4' },
      { type: 'video', poster: '/images/techo12/3.png', title: 'Techo 12 primera', videoUrl: '/images/techo12/3.mp4' },
    ],
    qualities: {
      primera: ['Buena uniformidad de celdas', 'Excelente rendimiento térmico', 'Consistencia de peso'],
      segunda: ['Pequeñas imperfecciones', 'Precio más bajo', 'Opción para obras de menor exigencia estética'],
    },
  },
  {
    id: 'techo-15',
    name: 'Techo 15',
    category: 'Techos',
    image: '/images/techo15/techo15-1.png',
    description:
      'Alternativa para losas de mayor espesor y carga. Ofrece resistencia adicional para cubiertas ligeras y entrepisos.',
    features: [
      'Medidas: 15 x 30 x 30 cm',
      'Peso: 6.7 kg (aproximado)',
      'Rendimiento: 9 unidades por m²',
      'Mayor capacidad de carga',
      'Excelente resistencia a la compresión',
    ],
    applications: ['Losas de mayor espesor', 'Techos cargados', 'Entrepisos con mayor demanda'],
    specs: ['15 x 30 x 30 cm', '6.7 kg por pieza', '9 piezas por m²', 'Ideal para cargas más altas', 'Mayor durabilidad'],
    gallery: [
      { type: 'video', poster: '/images/techo15/1.png', title: 'Techo 15 de primera', videoUrl: '/images/techo15/1.mp4' },
      { type: 'video', poster: '/images/techo15/2.png', title: 'Techo 15 de primera', videoUrl: '/images/techo15/2.mp4' },
      { type: 'video', poster: '/images/techo15/3.png', title: 'Techo 15 de primera', videoUrl: '/images/techo15/3.mp4' }
    ],
    qualities: {
      primera: ['Mayor estabilidad estructural', 'Mejor resistencia a cargas', 'Apto para uso industrial'],
      segunda: ['Pequeñas marcas en superficie', 'Precio competitivo', 'Útil para techos de obra bruta'],
    },
  },
];

export const productCategories = [
  { id: 'muros', label: 'Muros', productIds: ['pandereta', 'king-kong'] },
  { id: 'techos', label: 'Techos', productIds: ['techo-12', 'techo-15'] },
];

export const getProductById = (id: string): Product | null => {
  return products.find((product) => product.id === id) ?? null;
};
