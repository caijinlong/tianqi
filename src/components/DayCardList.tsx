import type { DayData } from '../types/weather';
import DayCard from './DayCard';

interface DayCardListProps {
  days: DayData[];
}

export default function DayCardList({ days }: DayCardListProps) {
  return (
    <div className="flex gap-2 overflow-x-auto pb-2">
      {days.map((day) => (
        <DayCard key={day.date} day={day} />
      ))}
    </div>
  );
}
