import { useEffect, useState } from 'react';
import type { CityConfig, WeatherData } from '../types/weather';
import { fetchWeather } from '../api/weather';
import { splitDailyData } from '../utils/dateUtils';
import CurrentWeather from './CurrentWeather';
import WeekTabs from './WeekTabs';
import DayCardList from './DayCardList';

interface CityWeatherProps {
  city: CityConfig;
}

export default function CityWeather({ city }: CityWeatherProps) {
  const [data, setData] = useState<WeatherData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<'forecast' | 'history'>('forecast');

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
      <div className="bg-white/20 backdrop-blur-md rounded-2xl p-8 shadow-lg animate-pulse border border-white/30">
        <div className="h-6 bg-white/30 rounded w-20 mb-4" />
        <div className="h-16 bg-white/30 rounded mb-4" />
        <div className="h-8 bg-white/30 rounded w-40 mb-4" />
        <div className="flex gap-2">
          {Array.from({ length: 7 }).map((_, i) => (
            <div key={i} className="h-32 w-20 bg-white/30 rounded-xl" />
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

  const { pastWeek, futureWeek } = splitDailyData(data.daily);
  const displayDays = activeTab === 'forecast' ? futureWeek : pastWeek;

  return (
    <div>
      <CurrentWeather data={data.current} cityName={city.name} />
      <WeekTabs activeTab={activeTab} onTabChange={setActiveTab} />
      <DayCardList days={displayDays} />
    </div>
  );
}
