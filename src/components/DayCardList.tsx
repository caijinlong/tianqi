import type { DayData } from '../types/weather';
import DayCard from './DayCard';
import { useRef, useEffect } from 'react';
import dayjs from 'dayjs';

interface DayCardListProps {
  days: DayData[];
}

export default function DayCardList({ days }: DayCardListProps) {
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = scrollRef.current;
    if (!container) return;

    const today = dayjs().format('YYYY-MM-DD');
    const todayIndex = days.findIndex((d) => d.date === today);
    if (todayIndex === -1) return;

    const cards = container.children;
    if (cards[todayIndex]) {
      const card = cards[todayIndex] as HTMLElement;
      container.scrollLeft = card.offsetLeft - container.offsetWidth / 2 + card.offsetWidth / 2;
    }
  }, [days]);

  return (
    <div
      ref={scrollRef}
      className="flex gap-2 overflow-x-auto pb-3 mt-4 scroll-smooth"
      style={{ scrollbarWidth: 'thin', scrollbarColor: 'rgba(255,255,255,0.4) transparent' }}
    >
      {days.map((day) => (
        <DayCard key={day.date} day={day} />
      ))}
    </div>
  );
}
