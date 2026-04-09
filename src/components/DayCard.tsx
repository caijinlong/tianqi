import type { DayData } from '../types/weather';
import { getWeatherInfo } from '../utils/weatherCodes';
import { formatDate } from '../utils/dateUtils';
import dayjs from 'dayjs';

interface DayCardProps {
  day: DayData;
}

export default function DayCard({ day }: DayCardProps) {
  const { weekday, date } = formatDate(day.date);
  const { label, emoji } = getWeatherInfo(day.weatherCode);
  const isToday = day.date === dayjs().format('YYYY-MM-DD');

  return (
    <div
      className={`flex flex-col items-center gap-1 rounded-xl p-3 min-w-[80px] shrink-0 transition-all ${
        isToday
          ? 'bg-white shadow-lg ring-2 ring-sky-400 scale-105'
          : 'bg-white/80 backdrop-blur-sm hover:bg-white/90 shadow-sm'
      }`}
    >
      <span className={`text-sm font-medium ${isToday ? 'text-sky-600 font-bold' : 'text-slate-700'}`}>
        {weekday}
      </span>
      <span className="text-xs text-slate-400">{date}</span>
      <span className="text-2xl my-1">{emoji}</span>
      <span className="text-xs text-slate-500">{label}</span>
      <div className="flex gap-2 text-sm mt-1">
        <span className="font-semibold text-orange-500">{Math.round(day.temperatureMax)}°</span>
        <span className="text-slate-400">{Math.round(day.temperatureMin)}°</span>
      </div>
    </div>
  );
}
