interface WeatherInfo {
  label: string;
  emoji: string;
}

export interface WeatherTheme {
  bg: string;
  text: string;
  sub: string;
}

const weatherCodeMap: Record<number, WeatherInfo> = {
  0: { label: '晴', emoji: '☀️' },
  1: { label: '大部晴朗', emoji: '🌤️' },
  2: { label: '多云', emoji: '⛅' },
  3: { label: '阴', emoji: '☁️' },
  45: { label: '雾', emoji: '🌫️' },
  48: { label: '雾凇', emoji: '🌫️' },
  51: { label: '小毛毛雨', emoji: '🌦️' },
  53: { label: '毛毛雨', emoji: '🌦️' },
  55: { label: '大毛毛雨', emoji: '🌦️' },
  56: { label: '冻毛毛雨', emoji: '🌧️' },
  57: { label: '冻雨', emoji: '🌧️' },
  61: { label: '小雨', emoji: '🌧️' },
  63: { label: '中雨', emoji: '🌧️' },
  65: { label: '大雨', emoji: '🌧️' },
  66: { label: '冻小雨', emoji: '🌧️' },
  67: { label: '冻大雨', emoji: '🌧️' },
  71: { label: '小雪', emoji: '🌨️' },
  73: { label: '中雪', emoji: '🌨️' },
  75: { label: '大雪', emoji: '❄️' },
  77: { label: '雪粒', emoji: '❄️' },
  80: { label: '小阵雨', emoji: '🌦️' },
  81: { label: '阵雨', emoji: '🌧️' },
  82: { label: '大阵雨', emoji: '🌧️' },
  85: { label: '小阵雪', emoji: '🌨️' },
  86: { label: '大阵雪', emoji: '❄️' },
  95: { label: '雷暴', emoji: '⛈️' },
  96: { label: '雷暴冰雹', emoji: '⛈️' },
  99: { label: '强雷暴冰雹', emoji: '⛈️' },
};

export function getWeatherInfo(code: number): WeatherInfo {
  return weatherCodeMap[code] ?? { label: '未知', emoji: '❓' };
}

export function getWeatherTheme(code: number): WeatherTheme {
  // 晴天
  if (code <= 1) return { bg: 'linear-gradient(135deg, rgba(245,158,11,0.85), rgba(249,115,22,0.85), rgba(251,146,60,0.8))', text: 'text-white', sub: 'text-white/80' };
  // 多云/阴
  if (code <= 3) return { bg: 'linear-gradient(135deg, rgba(100,116,139,0.8), rgba(148,163,184,0.75), rgba(120,144,156,0.75))', text: 'text-white', sub: 'text-white/70' };
  // 雾
  if (code <= 48) return { bg: 'linear-gradient(135deg, rgba(156,163,175,0.75), rgba(176,190,197,0.7), rgba(207,216,220,0.7))', text: 'text-slate-800', sub: 'text-slate-600' };
  // 毛毛雨/小雨
  if (code <= 57) return { bg: 'linear-gradient(135deg, rgba(91,134,166,0.8), rgba(126,168,190,0.75), rgba(160,196,216,0.75))', text: 'text-white', sub: 'text-white/70' };
  // 雨
  if (code <= 67) return { bg: 'linear-gradient(135deg, rgba(91,125,149,0.8), rgba(122,155,181,0.75), rgba(143,175,197,0.75))', text: 'text-white', sub: 'text-white/80' };
  // 雪
  if (code <= 77) return { bg: 'linear-gradient(135deg, rgba(191,219,254,0.8), rgba(224,231,255,0.75), rgba(219,234,254,0.75))', text: 'text-slate-800', sub: 'text-slate-600' };
  // 阵雨
  if (code <= 82) return { bg: 'linear-gradient(135deg, rgba(59,104,148,0.8), rgba(74,127,173,0.75), rgba(107,158,196,0.75))', text: 'text-white', sub: 'text-white/70' };
  // 阵雪
  if (code <= 86) return { bg: 'linear-gradient(135deg, rgba(147,197,232,0.75), rgba(182,215,239,0.7), rgba(209,232,245,0.7))', text: 'text-slate-800', sub: 'text-slate-600' };
  // 雷暴
  if (code <= 99) return { bg: 'linear-gradient(135deg, rgba(30,27,75,0.65), rgba(49,46,129,0.6), rgba(76,29,149,0.6))', text: 'text-white', sub: 'text-white/70' };
  return { bg: 'linear-gradient(135deg, rgba(226,232,240,0.75), rgba(241,245,249,0.7))', text: 'text-slate-800', sub: 'text-slate-600' };
}
