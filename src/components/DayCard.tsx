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
      className={`flex flex-col items-center gap-1 rounded-xl p-3 min-w-[80px] transition-all ${
        isToday
          ? 'bg-white shadow-lg ring-2 ring-yellow-300 scale-105'
          : 'bg-white/30 backdrop-blur-sm hover:bg-white/50 border border-white/30'
      }`}
    >
      <span className={`text-sm font-medium ${isToday ? 'text-sky-600' : 'text-white drop-shadow-sm'}`}>
        {weekday}
      </span>
      <span className={`text-xs ${isToday ? 'text-slate-400' : 'text-white/60'}`}>{date}</span>
      <span className="text-2xl my-1 drop-shadow-sm">{emoji}</span>
      <span className={`text-xs ${isToday ? 'text-slate-500' : 'text-white/70'}`}>{label}</span>
      <div className="flex gap-2 text-sm mt-1">
        <span className={`font-semibold ${isToday ? 'text-orange-500' : 'text-yellow-200'}`}>
          {Math.round(day.temperatureMax)}°
        </span>
        <span className={isToday ? 'text-slate-400' : 'text-white/50'}>
          {Math.round(day.temperatureMin)}°
        </span>
      </div>
    </div>
  );
}
