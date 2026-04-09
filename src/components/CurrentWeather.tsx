import type { CurrentData } from '../types/weather';
import { getWeatherInfo, getWeatherTheme } from '../utils/weatherCodes';

interface CurrentWeatherProps {
  data: CurrentData;
  cityName: string;
}

function getWeatherClass(code: number): string {
  if (code <= 1) return 'weather-sunny';
  if (code <= 3) return 'weather-cloudy';
  if (code <= 48) return 'weather-fog';
  if (code <= 67) return 'weather-rain';
  if (code <= 77) return 'weather-snow';
  if (code <= 82) return 'weather-rain';
  if (code <= 86) return 'weather-snow';
  if (code <= 99) return 'weather-thunder';
  return '';
}

function WeatherEffect({ code }: { code: number }) {
  // 晴天：太阳 + 光线
  if (code <= 1) {
    return (
      <>
        <div className="wx-sun" />
        <div className="wx-ray" />
      </>
    );
  }
  // 多云/阴
  if (code <= 3) {
    return (
      <>
        <div className="wx-cloud" />
        <div className="wx-cloud" />
        <div className="wx-cloud" />
      </>
    );
  }
  // 雾
  if (code <= 48) {
    return (
      <>
        <div className="wx-fog" />
        <div className="wx-fog" />
        <div className="wx-fog" />
      </>
    );
  }
  // 雨（毛毛雨/雨/阵雨）
  if (code <= 67 || (code >= 80 && code <= 82)) {
    const count = code <= 57 ? 8 : 14;
    return (
      <>
        {Array.from({ length: count }).map((_, i) => (
          <div
            key={i}
            className="wx-drop"
            style={{
              left: `${8 + i * (84 / count)}%`,
              height: `${12 + Math.random() * 16}px`,
              animationDuration: `${0.6 + Math.random() * 0.5}s`,
              animationDelay: `${Math.random() * 1.5}s`,
            }}
          />
        ))}
      </>
    );
  }
  // 雪
  if (code <= 77 || (code >= 85 && code <= 86)) {
    return (
      <>
        {Array.from({ length: 10 }).map((_, i) => (
          <div
            key={i}
            className="wx-flake"
            style={{
              left: `${5 + i * 9}%`,
              width: `${4 + Math.random() * 4}px`,
              height: `${4 + Math.random() * 4}px`,
              animationDuration: `${2 + Math.random() * 2}s`,
              animationDelay: `${Math.random() * 3}s`,
            }}
          />
        ))}
      </>
    );
  }
  // 雷暴
  if (code <= 99) {
    return (
      <>
        <div className="wx-flash" />
        {Array.from({ length: 12 }).map((_, i) => (
          <div
            key={i}
            className="wx-drop"
            style={{
              left: `${6 + i * 7}%`,
              height: `${14 + Math.random() * 14}px`,
              animationDuration: `${0.5 + Math.random() * 0.4}s`,
              animationDelay: `${Math.random() * 1.2}s`,
            }}
          />
        ))}
      </>
    );
  }
  return null;
}

export default function CurrentWeather({ data, cityName }: CurrentWeatherProps) {
  const { label, emoji } = getWeatherInfo(data.weatherCode);
  const theme = getWeatherTheme(data.weatherCode);
  const weatherClass = getWeatherClass(data.weatherCode);

  return (
    <div
      className={`relative overflow-hidden rounded-2xl p-6 shadow-lg backdrop-blur-md ${weatherClass}`}
      style={{ background: theme.bg }}
    >
      {/* 天气动效背景层 */}
      <WeatherEffect code={data.weatherCode} />

      {/* 内容层 */}
      <div className="relative z-10">
        <h2 className={`text-xl font-bold mb-3 ${theme.text}`}>{cityName}</h2>
        <div className="flex items-center gap-4">
          <span className="text-5xl">{emoji}</span>
          <div>
            <div className={`text-4xl font-bold ${theme.text}`}>
              {Math.round(data.temperature)}°C
            </div>
            <div className={`mt-1 ${theme.sub}`}>{label}</div>
          </div>
        </div>
        <div className={`flex gap-6 mt-4 text-sm ${theme.sub}`}>
          <span>湿度 {data.humidity}%</span>
          <span>风速 {Math.round(data.windSpeed)} km/h</span>
        </div>
      </div>
    </div>
  );
}
