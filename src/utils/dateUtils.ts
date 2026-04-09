import dayjs from 'dayjs';
import 'dayjs/locale/zh-cn';
import type { DayData } from '../types/weather';

dayjs.locale('zh-cn');

export function formatDate(dateStr: string): { weekday: string; date: string } {
  const d = dayjs(dateStr);
  const today = dayjs().startOf('day');
  const diff = d.diff(today, 'day');

  let weekday: string;
  if (diff === 0) weekday = '今天';
  else if (diff === 1) weekday = '明天';
  else if (diff === -1) weekday = '昨天';
  else weekday = d.format('ddd');

  return {
    weekday,
    date: d.format('M/D'),
  };
}

export function splitDailyData(daily: DayData[]): {
  pastWeek: DayData[];
  futureWeek: DayData[];
} {
  const today = dayjs().format('YYYY-MM-DD');
  const todayIndex = daily.findIndex((d) => d.date === today);

  if (todayIndex === -1) {
    const mid = Math.floor(daily.length / 2);
    return {
      pastWeek: daily.slice(0, mid),
      futureWeek: daily.slice(mid),
    };
  }

  return {
    pastWeek: daily.slice(Math.max(0, todayIndex - 7), todayIndex),
    futureWeek: daily.slice(todayIndex, todayIndex + 8),
  };
}
