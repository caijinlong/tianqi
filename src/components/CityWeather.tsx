import { useEffect, useState } from 'react';
import type { CityConfig, WeatherData } from '../types/weather';
import { fetchWeather } from '../api/weather';
import CurrentWeather from './CurrentWeather';
import DayCardList from './DayCardList';

interface CityWeatherProps {
  city: CityConfig;
}

export default function CityWeather({ city }: CityWeatherProps) {
  const [data, setData] = useState<WeatherData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setLoading(true);
    setError(null);
    fetchWeather(city)
      .then(setData)
      .catch((err) => setError(err.message ?? '加载失败'))
      .finally(() => setLoading(false));
  }, [city]);

  if (loading) {
    return (
      <div className="bg-white/90 backdrop-blur-md rounded-2xl p-8 shadow-lg animate-pulse">
        <div className="h-6 bg-slate-200 rounded w-20 mb-4" />
        <div className="h-16 bg-slate-200 rounded mb-4" />
        <div className="flex gap-2 mt-4">
          {Array.from({ length: 7 }).map((_, i) => (
            <div key={i} className="h-32 w-20 bg-slate-200 rounded-xl shrink-0" />
          ))}
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-50 rounded-2xl p-8 text-center">
        <p className="text-red-500">加载 {city.name} 天气失败</p>
        <p className="text-red-400 text-sm mt-1">{error}</p>
      </div>
    );
  }

  if (!data) return null;

  return (
    <div className="flex flex-col h-full">
      <CurrentWeather data={data.current} cityName={city.name} />
      <p className="text-white/70 text-xs mt-4 mb-1 drop-shadow-sm">
        ← 过去两周 · 今天 · 未来两周 →（左右滑动查看）
      </p>
      <DayCardList days={data.daily} />
    </div>
  );
}
