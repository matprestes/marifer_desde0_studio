import type { StaticImageData } from 'next/image';

import heroStoreImg from '@/assets/images/hero_marifer_store_1794777885270.jpg';
import buzoPolarImg from '@/assets/images/product_buzo_polar_1794777885341.jpg';
import zapatillaUrbanaImg from '@/assets/images/product_zapatilla_urbana_1794777885821.jpg';
import bodySplashImg from '@/assets/images/product_body_splash_1794777887110.jpg';
import hermeticosCocinaImg from '@/assets/images/product_hermeticos_cocina_1794777886313.jpg';
import camperaInfladaImg from '@/assets/images/product_campera_inflada_1794777886801.jpg';
import calzaFrizaImg from '@/assets/images/product_calza_friza_1794777887469.jpg';
import termoMateImg from '@/assets/images/product_termo_mate_1794777887264.jpg';
import difusorCremaImg from '@/assets/images/product_difusor_crema_1794777888173.jpg';
import bentoBazarImg from '@/assets/images/bento_bazar_hogar_1794777888359.jpg';
import bentoEscolarImg from '@/assets/images/bento_escolar_infantil_1794777889067.jpg';
import bentoPantuflasImg from '@/assets/images/bento_pantuflas_abrigo_1794777889896.jpg';

export type RubroId =
  | 'todos'
  | 'indumentaria'
  | 'calzado'
  | 'perfumeria'
  | 'bazar'
  | 'infantil';

export interface RubroOption {
  id: RubroId;
  label: string;
  shortLabel: string;
}

export interface Product {
  id: string;
  name: string;
  category: Exclude<RubroId, 'todos'>;
  categoryLabel: string;
  price: number;
  oldPrice?: number;
  priceLabel?: string;
  badge?: string;
  badgeTone?: 'coral' | 'mint' | 'violet' | 'peach';
  rating: number;
  purchasesCount: number;
  description: string;
  variants: string[];
  variantLabel: string;
  whatsappPrompt: string;
  ctaLabel?: string;
  image: StaticImageData;
  imageAlt: string;
  section: 'most-ordered' | 'seasonal' | 'catalog-extra';
}

export interface BentoCategoryCard {
  id: string;
  rubro: Exclude<RubroId, 'todos'>;
  kicker: string;
  title: string;
  description: string;
  ctaText: string;
  whatsappText: string;
  image: StaticImageData;
  imageAlt: string;
  theme: 'sky' | 'mint' | 'gold' | 'peach' | 'violet';
  featuredWide?: boolean;
  priceHighlight?: string;
}

export const HERO_STORE_IMAGE = {
  src: heroStoreImg,
  alt: 'Interior cálido de MARIFER Tienda de Barrio en Sayago, Montevideo, con vecinas eligiendo buzos de friza, calzado urbano y artículos de cerámica para el hogar.',
};

export const RUBROS: RubroOption[] = [
  { id: 'todos', label: 'Todos los rubros', shortLabel: 'Todos' },
  { id: 'indumentaria', label: 'Ropa & Abrigo', shortLabel: 'Indumentaria' },
  { id: 'calzado', label: 'Calzado & Pantuflas', shortLabel: 'Calzado' },
  { id: 'perfumeria', label: 'Perfumería & Spa', shortLabel: 'Perfumería' },
  { id: 'bazar', label: 'Bazar & Hogar', shortLabel: 'Bazar' },
  { id: 'infantil', label: 'Infantil & Escolar', shortLabel: 'Infantil' },
];

export const PRODUCTS: Product[] = [
  {
    id: 'buzo-polar-frizado',
    name: 'Buzo polar frizado',
    category: 'indumentaria',
    categoryLabel: 'Ropa & Abrigo',
    price: 690,
    rating: 5.0,
    purchasesCount: 28,
    description:
      'Polar grueso térmico súper abrigado con medio cierre, ideal para el día a día en Sayago.',
    variants: ['S (Lavanda)', 'M (Lavanda)', 'L (Gris)', 'XL (Gris)', 'XXL (Negro)'],
    variantLabel: 'Talle y color',
    whatsappPrompt: 'Hola! Quisiera consultar por el Buzo polar frizado',
    ctaLabel: 'Consultar color y talle',
    image: buzoPolarImg,
    imageAlt: 'Buzo polar frizado unisex en tonos lavanda suave y gris carbón en percha de madera.',
    section: 'most-ordered',
  },
  {
    id: 'zapatilla-urbana-unisex',
    name: 'Zapatilla urbana unisex',
    category: 'calzado',
    categoryLabel: 'Calzado Diario',
    price: 950,
    rating: 4.9,
    purchasesCount: 42,
    description:
      'Suela liviana acolchada y capellada respirable para caminar cómodo todo el día.',
    variants: ['36', '37', '38', '39', '40', '41', '42', '43'],
    variantLabel: 'Número',
    whatsappPrompt: 'Hola! Quisiera consultar talles de la Zapatilla urbana unisex',
    ctaLabel: 'Consultar número',
    image: zapatillaUrbanaImg,
    imageAlt: 'Zapatillas urbanas unisex color crema con detalles en terracota y salvia.',
    section: 'most-ordered',
  },
  {
    id: 'body-splash-flor-cerezo',
    name: 'Body Splash Flor de Cerezo',
    category: 'perfumeria',
    categoryLabel: 'Perfumería',
    price: 380,
    rating: 5.0,
    purchasesCount: 54,
    description:
      'Bruma corporal fresca y suave con notas florales de cerezo, perfecta para uso diario o regalo.',
    variants: ['Flor de Cerezo 200ml', 'Vainilla Suave 200ml', 'Lavanda & Jazmín 200ml'],
    variantLabel: 'Fragancia',
    whatsappPrompt: 'Hola! Quisiera reservar un Body Splash Flor de Cerezo',
    ctaLabel: 'Probar aroma',
    image: bodySplashImg,
    imageAlt: 'Frasco esmerilado de Body Splash Flor de Cerezo sobre piedra travertino.',
    section: 'most-ordered',
  },
  {
    id: 'set-hermeticos-cocina',
    name: 'Set x4 Herméticos Cocina',
    category: 'bazar',
    categoryLabel: 'Bazar & Cocina',
    price: 490,
    rating: 4.8,
    purchasesCount: 37,
    description:
      'Cuatro recipientes apilables libres de BPA con cierre hermético y tapas en tonos pastel.',
    variants: ['Set x4 Pastel', 'Set x4 Neutro'],
    variantLabel: 'Presentación',
    whatsappPrompt: 'Hola! Tienen disponible el Set x4 Herméticos?',
    ctaLabel: 'Pedir por WhatsApp',
    image: hermeticosCocinaImg,
    imageAlt: 'Set de cuatro recipientes herméticos transparentes apilados con tapas pastel.',
    section: 'most-ordered',
  },
  {
    id: 'campera-inflada-termica',
    name: 'Campera Inflada Liviana Térmica',
    category: 'indumentaria',
    categoryLabel: 'Indumentaria',
    price: 1190,
    oldPrice: 1450,
    badge: 'Más Vendido',
    badgeTone: 'coral',
    rating: 5.0,
    purchasesCount: 31,
    description:
      'Súper liviana, repelente al agua y con capucha desmontable. Ideal para las mañanas frías.',
    variants: ['S (Verde Oliva)', 'M (Verde Oliva)', 'L (Negro)', 'XL (Negro)', 'XXL (Negro)'],
    variantLabel: 'Talle y color',
    whatsappPrompt: 'Hola! Me interesa la Campera Inflada Liviana Térmica',
    image: camperaInfladaImg,
    imageAlt: 'Campera inflada térmica color verde oliva y negro con capucha desmontable.',
    section: 'seasonal',
  },
  {
    id: 'calza-tiro-alto-friza',
    name: 'Calza Tiro Alto con Friza',
    category: 'indumentaria',
    categoryLabel: 'Comodidad Diaria',
    price: 420,
    priceLabel: 'Precio vecinal',
    badge: 'Talles Reales S al 4XL',
    badgeTone: 'mint',
    rating: 4.9,
    purchasesCount: 46,
    description:
      'Tejido suave que no trasluce, faja ancha contenida y abrigo interior ultra suave.',
    variants: ['S (Negro)', 'M (Negro)', 'L (Azul Marino)', 'XL (Negro)', '2XL (Negro)', '3XL (Azul Marino)', '4XL (Negro)'],
    variantLabel: 'Talle y color',
    whatsappPrompt: 'Hola! Quisiera consultar talles de la Calza Tiro Alto con Friza',
    image: calzaFrizaImg,
    imageAlt: 'Calzas tiro alto con interior de friza abrigada en azul marino y negro.',
    section: 'seasonal',
  },
  {
    id: 'termo-acero-inox-1l',
    name: 'Termo Acero Inox 1L',
    category: 'bazar',
    categoryLabel: 'Bazar & Mate',
    price: 750,
    oldPrice: 890,
    badge: 'Conserva 24 hs',
    badgeTone: 'violet',
    rating: 5.0,
    purchasesCount: 63,
    description:
      'Pico cebador matero preciso, doble capa térmica para frío/calor y garantía de durabilidad.',
    variants: ['Verde Mate 1L', 'Negro Mate 1L', 'Acero Clásico 1L'],
    variantLabel: 'Color',
    whatsappPrompt: 'Hola! Quisiera saber más del Termo Acero Inox 1L',
    image: termoMateImg,
    imageAlt: 'Termo de acero inoxidable de 1 litro en verde salvia mate con pico cebador junto a un mate.',
    section: 'seasonal',
  },
  {
    id: 'difusor-varillas-crema',
    name: 'Difusor de Varillas + Crema',
    category: 'perfumeria',
    categoryLabel: 'Aromas & Spa',
    price: 360,
    priceLabel: 'Combo dúo',
    badge: 'Ideal Regalo',
    badgeTone: 'peach',
    rating: 4.9,
    purchasesCount: 29,
    description:
      'Fragancias persistentes de Vainilla Francesa o Verbena con crema hidratante para manos.',
    variants: ['Bergamota & Lavanda', 'Vainilla Francesa', 'Verbena Cítrica'],
    variantLabel: 'Aroma',
    whatsappPrompt: 'Hola! Quiero pedir el combo de Difusor más Crema',
    image: difusorCremaImg,
    imageAlt: 'Combo regalo de difusor de varillas en frasco ámbar y crema botánica para manos.',
    section: 'seasonal',
  },
  {
    id: 'pantuflas-chiporro-abrigadas',
    name: 'Pantuflas Abrigadas con Chiporro',
    category: 'calzado',
    categoryLabel: 'Calzado de Hogar',
    price: 480,
    oldPrice: 680,
    badge: '30% OFF',
    badgeTone: 'mint',
    rating: 4.9,
    purchasesCount: 34,
    description:
      'Interior mullido tipo corderito y suela antideslizante flexible para andar cómodo por casa.',
    variants: ['35/36 Beige', '37/38 Beige', '39/40 Gris', '41/42 Gris'],
    variantLabel: 'Número',
    whatsappPrompt: 'Hola! Quiero consultar talles de las Pantuflas Abrigadas con Chiporro',
    image: bentoPantuflasImg,
    imageAlt: 'Pantuflas abrigadas color avena con interior de corderito sobre alfombra tejida.',
    section: 'catalog-extra',
  },
  {
    id: 'set-mate-bazar-uruguayo',
    name: 'Set Mate Cerámica + Bombilla',
    category: 'bazar',
    categoryLabel: 'Bazar & Mate',
    price: 620,
    badge: 'Ingreso de Semana',
    badgeTone: 'violet',
    rating: 5.0,
    purchasesCount: 22,
    description:
      'Mate artesanal curado o de cerámica térmica acompañado de bombilla de acero inoxidable.',
    variants: ['Mate Cuero + Bombilla', 'Mate Cerámica + Bombilla'],
    variantLabel: 'Modelo',
    whatsappPrompt: 'Hola! Quiero ver fotos del Set Mate + Bombilla',
    image: bentoBazarImg,
    imageAlt: 'Mates uruguayos con bombilla sobre mesada de madera con artículos de cocina.',
    section: 'catalog-extra',
  },
  {
    id: 'set-escolar-cartuchera-mochila',
    name: 'Combo Escolar Cartuchera + Útiles',
    category: 'infantil',
    categoryLabel: 'Infantil & Escolar',
    price: 520,
    oldPrice: 690,
    badge: '25% OFF',
    badgeTone: 'coral',
    rating: 4.8,
    purchasesCount: 19,
    description:
      'Cartuchera amplia con cierre reforzado, marcadores, lápices de colores y cuadernola.',
    variants: ['Pastel Rosa', 'Verde Oliva', 'Azul Marino'],
    variantLabel: 'Diseño',
    whatsappPrompt: 'Hola! Quiero consultar por el Combo Escolar Cartuchera + Útiles',
    image: bentoEscolarImg,
    imageAlt: 'Set escolar con cartuchera pastel, lápices de colores, cuadernola y mochila compacta.',
    section: 'catalog-extra',
  },
];

export const BENTO_CATEGORIES: BentoCategoryCard[] = [
  {
    id: 'bento-ropa',
    rubro: 'indumentaria',
    kicker: 'LIQUIDACIÓN 35% OFF',
    title: 'Ropa & Abrigo Para Todos los Días',
    description:
      'Buzos de friza, camperitas livianas y joggings cómodos para grandes y chicos.',
    ctaText: 'Consultar talle',
    whatsappText: 'Hola! Quiero consultar talles de la liquidación de ropa',
    image: buzoPolarImg,
    imageAlt: 'Buzo polar frizado en tonos lavanda y gris.',
    theme: 'sky',
  },
  {
    id: 'bento-calzado',
    rubro: 'calzado',
    kicker: 'COMODIDAD SAYAGO 30% OFF',
    title: 'Calzado Urbano & Pantuflas Abrigadas',
    description:
      'Para andar por casa bien calentito o salir a caminar sin que te duelan los pies.',
    ctaText: 'Elegir número',
    whatsappText: 'Hola! Quisiera elegir número en calzado y pantuflas',
    image: bentoPantuflasImg,
    imageAlt: 'Pantuflas abrigadas y championes livianos sobre alfombra cálida.',
    theme: 'mint',
  },
  {
    id: 'bento-perfumes',
    rubro: 'perfumeria',
    kicker: 'REGALOS LINDOS',
    title: 'Perfumes & Cuidado Personal',
    description:
      'Cremas hidratantes, jabonería aromática y estuches para obsequiar a precio accesible.',
    ctaText: 'Ver fragancias',
    whatsappText: 'Hola! Quisiera ver las fragancias disponibles',
    image: difusorCremaImg,
    imageAlt: 'Difusor aromático y crema hidratante para regalo.',
    theme: 'gold',
  },
  {
    id: 'bento-infantil',
    rubro: 'infantil',
    kicker: 'PARA LOS MÁS CHICOS 25% OFF',
    title: 'Abrigo Infantil & Detalles Escolares',
    description:
      'Panchas escolares, medias abrigadas, cartucheras y camperitas resistentes para la escuela y el liceo.',
    ctaText: 'Ver escolar e infantil',
    whatsappText: 'Hola! Quiero consultar por artículos infantiles',
    image: bentoEscolarImg,
    imageAlt: 'Artículos escolares infantiles con buzo tejido, cartuchera y mochila.',
    theme: 'peach',
  },
  {
    id: 'bento-bazar',
    rubro: 'bazar',
    kicker: 'EL FAVORITO DEL BARRIO',
    title: 'Bazar del Hogar & Detalles Útiles',
    description:
      'Mates uruguayos, bombillas de alpaca, manteles antimanchas, organizadores y piezas prácticas para renovar tu cocina desde tan solo',
    priceHighlight: '$120',
    ctaText: 'Pedir fotos por WhatsApp',
    whatsappText: 'Hola! Me gustaría ver fotos de bazar y cositas para el hogar',
    image: bentoBazarImg,
    imageAlt: 'Mesada de cocina con mates uruguayos, bombillas y piezas de cerámica.',
    theme: 'violet',
    featuredWide: true,
  },
];
