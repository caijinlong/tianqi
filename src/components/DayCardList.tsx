import type { DayData } from '../types/weather';
import DayCard from './DayCard';

interface DayCardListProps {
  days: DayData[];
}

export default function DayCardList({ days }: DayCardListProps) {
  return (
    <div className="grid grid-cols-7 gap-2 pb-2">
      {days.map((day) => (
        <DayCard key={day.date} day={day} />
      ))}
    </div>
  );
}
