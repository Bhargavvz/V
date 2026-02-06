// Day configuration with passwords and themes
export interface DayConfig {
  id: string;
  name: string;
  emoji: string;
  date: string;
  theme: string;
  password: string;
  tagline: string;
  gradient: string;
  accentColor: string;
}

export const DAYS: DayConfig[] = [
  {
    id: 'rose',
    name: 'Rose Day',
    emoji: '🌹',
    date: 'February 7',
    theme: 'Admiration & Beauty',
    password: 'rose',
    tagline: 'Where it all begins...',
    gradient: 'linear-gradient(135deg, #ffd6e0 0%, #ffb3c6 50%, #ff8fab 100%)',
    accentColor: '#ff8fab',
  },
  {
    id: 'propose',
    name: 'Propose Day',
    emoji: '💍',
    date: 'February 8',
    theme: 'Commitment',
    password: 'forever',
    tagline: 'Choosing each other...',
    gradient: 'linear-gradient(135deg, #1a1a2e 0%, #2d132c 50%, #16213e 100%)',
    accentColor: '#9d4edd',
  },
  {
    id: 'chocolate',
    name: 'Chocolate Day',
    emoji: '🍫',
    date: 'February 9',
    theme: 'Sweetness',
    password: 'sweet',
    tagline: 'Life is sweeter with you...',
    gradient: 'linear-gradient(135deg, #f5e6d3 0%, #d2b48c 50%, #a0522d 100%)',
    accentColor: '#a0522d',
  },
  {
    id: 'teddy',
    name: 'Teddy Day',
    emoji: '🧸',
    date: 'February 10',
    theme: 'Comfort',
    password: 'cuddle',
    tagline: 'Soft hugs for hard days...',
    gradient: 'linear-gradient(135deg, #fef3e2 0%, #fce4ec 50%, #f8bbd9 100%)',
    accentColor: '#d4a574',
  },
  {
    id: 'promise',
    name: 'Promise Day',
    emoji: '🤝',
    date: 'February 11',
    theme: 'Trust',
    password: 'trust',
    tagline: 'Words that last forever...',
    gradient: 'linear-gradient(135deg, #ffffff 0%, #fff8e7 50%, #fef3cd 100%)',
    accentColor: '#ffc107',
  },
  {
    id: 'hug',
    name: 'Hug Day',
    emoji: '🤗',
    date: 'February 12',
    theme: 'Warmth',
    password: 'warmth',
    tagline: 'Closer than distance...',
    gradient: 'linear-gradient(135deg, #ffccd5 0%, #ffb3ba 50%, #ff8c94 100%)',
    accentColor: '#ff8c94',
  },
  {
    id: 'kiss',
    name: 'Kiss Day',
    emoji: '💋',
    date: 'February 13',
    theme: 'Intimacy',
    password: 'love',
    tagline: 'A moment of magic...',
    gradient: 'linear-gradient(135deg, #2d132c 0%, #3d1a3d 50%, #1a1a2e 100%)',
    accentColor: '#ff4d6d',
  },
  {
    id: 'valentine',
    name: "Valentine's Day",
    emoji: '❤️',
    date: 'February 14',
    theme: 'Forever',
    password: 'eternal',
    tagline: 'Everything, always...',
    gradient: 'linear-gradient(135deg, #ff4d6d 0%, #c9184a 50%, #800f2f 100%)',
    accentColor: '#c9184a',
  },
];

export const getDayById = (id: string): DayConfig | undefined => {
  return DAYS.find((day) => day.id === id);
};

// Animation timing presets
export const TIMING = {
  fast: 0.15,
  normal: 0.3,
  slow: 0.5,
  slower: 0.8,
  slowest: 1.2,
};

// Framer Motion variants
export const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -20 },
};

export const fadeIn = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  exit: { opacity: 0 },
};

export const scaleIn = {
  initial: { opacity: 0, scale: 0.9 },
  animate: { opacity: 1, scale: 1 },
  exit: { opacity: 0, scale: 0.9 },
};

export const staggerContainer = {
  animate: {
    transition: {
      staggerChildren: 0.1,
    },
  },
};
