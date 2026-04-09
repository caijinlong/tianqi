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

    let rafId: number;
    let attempts = 0;

    const doScroll = () => {
      const today = dayjs().format('YYYY-MM-DD');
      const todayIndex = days.findIndex((d) => d.date === today);
      if (todayIndex < 1) return;

      const yesterdayCard = container.children[todayIndex - 1] as HTMLElement;
      if (!yesterdayCard) return;

      const target = yesterdayCard.offsetLeft;
      container.scrollLeft = target;

      // Verify scroll took effect; retry if container wasn't ready
      if (Math.abs(container.scrollLeft - target) > 2 && attempts < 30) {
        attempts++;
        rafId = requestAnimationFrame(doScroll);
      }
    };

    rafId = requestAnimationFrame(doScroll);
    return () => cancelAnimationFrame(rafId);
  }, [days]);

  return (
    <div
      ref={scrollRef}
      className="flex gap-2 overflow-x-auto pb-3 mt-4"
      style={{ scrollbarWidth: 'thin', scrollbarColor: 'rgba(255,255,255,0.4) transparent' }}
    >
      {days.map((day) => (
        <DayCard key={day.date} day={day} />
      ))}
    </div>
  );
}
