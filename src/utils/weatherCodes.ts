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
  if (code <= 1) return { bg: 'linear-gradient(135deg, #f59e0b, #f97316, #fb923c)', text: 'text-white', sub: 'text-white/80' };
  // 多云/阴
  if (code <= 3) return { bg: 'linear-gradient(135deg, #64748b, #94a3b8, #78909c)', text: 'text-white', sub: 'text-white/70' };
  // 雾
  if (code <= 48) return { bg: 'linear-gradient(135deg, #9ca3af, #b0bec5, #cfd8dc)', text: 'text-slate-800', sub: 'text-slate-600' };
  // 毛毛雨/小雨
  if (code <= 57) return { bg: 'linear-gradient(135deg, #5b86a6, #7ea8be, #a0c4d8)', text: 'text-white', sub: 'text-white/70' };
  // 雨
  if (code <= 67) return { bg: 'linear-gradient(135deg, #5b7d95, #7a9bb5, #8fafc5)', text: 'text-white', sub: 'text-white/80' };
  // 雪
  if (code <= 77) return { bg: 'linear-gradient(135deg, #bfdbfe, #e0e7ff, #dbeafe)', text: 'text-slate-800', sub: 'text-slate-600' };
  // 阵雨
  if (code <= 82) return { bg: 'linear-gradient(135deg, #3b6894, #4a7fad, #6b9ec4)', text: 'text-white', sub: 'text-white/70' };
  // 阵雪
  if (code <= 86) return { bg: 'linear-gradient(135deg, #93c5e8, #b6d7ef, #d1e8f5)', text: 'text-slate-800', sub: 'text-slate-600' };
  // 雷暴
  if (code <= 99) return { bg: 'linear-gradient(135deg, #1e1b4b, #312e81, #4c1d95)', text: 'text-white', sub: 'text-white/70' };
  return { bg: 'linear-gradient(135deg, #e2e8f0, #f1f5f9)', text: 'text-slate-800', sub: 'text-slate-600' };
}
