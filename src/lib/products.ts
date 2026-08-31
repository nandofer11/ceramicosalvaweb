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
      'Medidas: 10 x 12 x 25 cm',
      'Peso: 2.2 kg (aproximado)',
      'Rendimiento: 32 unidades por m²',
      'Alta resistencia térmica',
      'Buen aislamiento acústico',
    ],
    applications: ['Muros divisorios interiores', 'Tabiquería en general', 'Cerramientos no portantes'],
    specs: ['10 x 12 x 25 cm', '2.2 kg por pieza', '32 piezas por m²', 'Buena absorción acústica', 'Apto para muros no estructurales'],
    gallery: [
      { type: 'image', src: '/images/pandereta/pandereta1.jpg', alt: 'Pandereta primera' },
      { type: 'image', src: '/images/pandereta/pandereta3.jpg', alt: 'Pandereta primera' },
      {type: 'image', src: '/images/pandereta/pandereta_mitades.jpg', alt: 'Pandereta mitades' },
      { type: 'video', poster: '/images/pandereta/pandereta2.jpg', title: 'Pandereta primera', videoUrl: '/images/pandereta/pandereta_primera_video.mp4' },
      { type: 'video', poster: '/images/pandereta/pandereta_segunda_foto.jpeg', title: 'Pandereta segunda', videoUrl: '/images/pandereta/pandereta_segunda_video.mp4' },
    ],
    qualities: {
      primera: ['Buena cocción', 'Color uniforme', 'Alta densidad y resistencia'],
      segunda: ['Pequeñas irregularidades estéticas', 'Precio más accesible', 'Apta para obras no vistas'],
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
      'Medidas: 9 x 13 x 24 cm',
      'Peso: 3.5 kg (aproximado)',
      'Rendimiento: 36 unidades por m²',
      'Alta resistencia a la compresión',
      'Excelente resistencia sísmica',
    ],
    applications: ['Muros portantes', 'Columnas estructurales', 'Construcciones de alta resistencia'],
    specs: ['9 x 13 x 24 cm', '3.5 kg por pieza', '36 piezas por m²', 'Alta resistencia sísmica', 'Uso estructural'],
    gallery: [
      { type: 'image', src: '/images/kkong/king_kong_primera.jpg', alt: 'King Kong 18 huecos primera' },
      { type: 'image', src: '/images/kkong/king_kong_primera2.jpg', alt: 'King Kong 18 huecos' },
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
      'Medidas: 30 x 30 x 12 cm',
      'Peso: 6.8 kg (aproximado)',
      'Rendimiento: 9 unidades por m²',
      'Alta resistencia a la compresión',
      'Menor peso en la estructura',
    ],
    applications: ['Losas aligeradas', 'Techos de concreto armado', 'Entrepisos'],
    specs: ['30 x 30 x 12 cm', '6.8 kg por pieza', '9 piezas por m²', 'Menor peso estructural', 'Buena aislación térmica'],
    gallery: [
      { type: 'image', src: '/images/techo12.png', alt: 'Techo 12' },
      { type: 'image', src: '/images/hero-background2.JPG', alt: 'Techo 12 en obra' },
      { type: 'video', poster: '/images/slider2.png', title: 'Video de instalación de Techo 12', videoUrl: '/images/techo12/video.mp4' },
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
    image: '/images/techo12.png',
    description:
      'Alternativa para losas de mayor espesor y carga. Ofrece resistencia adicional para cubiertas ligeras y entrepisos.',
    features: [
      'Medidas: 30 x 30 x 15 cm',
      'Peso: 8.5 kg (aproximado)',
      'Rendimiento: 7 unidades por m²',
      'Mayor capacidad de carga',
      'Excelente resistencia a la compresión',
    ],
    applications: ['Losas de mayor espesor', 'Techos cargados', 'Entrepisos con mayor demanda'],
    specs: ['30 x 30 x 15 cm', '8.5 kg por pieza', '7 piezas por m²', 'Ideal para cargas más altas', 'Mayor durabilidad'],
    gallery: [
      { type: 'image', src: '/images/techo12.png', alt: 'Techo 15' },
      { type: 'image', src: '/images/trailer.png', alt: 'Techo 15 en transporte' },
      { type: 'video', poster: '/images/slider2.png', title: 'Video de montaje de Techo 15', videoUrl: '/images/techo15/video.mp4' },
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
