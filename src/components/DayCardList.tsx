import type { DayData } from '../types/weather';
import DayCard from './DayCard';
import { useRef, useEffect, useCallback } from 'react';
import dayjs from 'dayjs';

interface DayCardListProps {
  days: DayData[];
}

export default function DayCardList({ days }: DayCardListProps) {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scrollToToday = useCallback(() => {
    const container = scrollRef.current;
    if (!container) return;

    const today = dayjs().format('YYYY-MM-DD');
    const todayIndex = days.findIndex((d) => d.date === today);
    if (todayIndex === -1) return;

    const cards = container.children;
    if (cards[todayIndex]) {
      const card = cards[todayIndex] as HTMLElement;
      const firstCard = cards[0] as HTMLElement;
      const offset = firstCard ? firstCard.offsetWidth + 8 : 88;
      container.scrollLeft = card.offsetLeft - offset;
    }
  }, [days]);

  useEffect(() => {
    // 多次尝试确保两个城市都能正确滚动
    scrollToToday();
    requestAnimationFrame(() => {
      requestAnimationFrame(scrollToToday);
    });
    const timer = setTimeout(scrollToToday, 100);
    return () => clearTimeout(timer);
  }, [scrollToToday]);

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
