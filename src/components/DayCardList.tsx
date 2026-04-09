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
      // 让今天的卡片出现在第二个位置（左边露出一张卡片的宽度）
      const firstCard = cards[0] as HTMLElement;
      const offset = firstCard ? firstCard.offsetWidth + 8 : 88; // 8 = gap-2
      container.scrollLeft = card.offsetLeft - offset;
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
