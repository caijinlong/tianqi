import type { CurrentData } from '../types/weather';
import { getWeatherInfo } from '../utils/weatherCodes';

interface CurrentWeatherProps {
  data: CurrentData;
  cityName: string;
}

export default function CurrentWeather({ data, cityName }: CurrentWeatherProps) {
  const { label, emoji } = getWeatherInfo(data.weatherCode);

  return (
    <div className="bg-white/30 backdrop-blur-md rounded-2xl p-6 shadow-lg border border-white/40">
      <h2 className="text-xl font-bold text-white drop-shadow-sm mb-3">{cityName}</h2>
      <div className="flex items-center gap-4">
        <span className="text-5xl drop-shadow-md">{emoji}</span>
        <div>
          <div className="text-4xl font-bold text-white drop-shadow-sm">
            {Math.round(data.temperature)}°C
          </div>
          <div className="text-white/80 mt-1">{label}</div>
        </div>
      </div>
      <div className="flex gap-6 mt-4 text-sm text-white/70">
        <span>湿度 {data.humidity}%</span>
        <span>风速 {Math.round(data.windSpeed)} km/h</span>
      </div>
    </div>
  );
}
