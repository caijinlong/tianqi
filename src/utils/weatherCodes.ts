interface WeatherInfo {
  label: string;
  emoji: string;
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
