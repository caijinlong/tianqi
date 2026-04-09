interface WeekTabsProps {
  activeTab: 'forecast' | 'history';
  onTabChange: (tab: 'forecast' | 'history') => void;
}

export default function WeekTabs({ activeTab, onTabChange }: WeekTabsProps) {
  return (
    <div className="flex gap-2 my-4">
      <button
        onClick={() => onTabChange('forecast')}
        className={`px-4 py-1.5 rounded-full text-sm font-medium transition-colors ${
          activeTab === 'forecast'
            ? 'bg-white text-sky-600 shadow-md'
            : 'bg-white/20 text-white hover:bg-white/30 backdrop-blur-sm'
        }`}
      >
        未来一周
      </button>
      <button
        onClick={() => onTabChange('history')}
        className={`px-4 py-1.5 rounded-full text-sm font-medium transition-colors ${
          activeTab === 'history'
            ? 'bg-white text-sky-600 shadow-md'
            : 'bg-white/20 text-white hover:bg-white/30 backdrop-blur-sm'
        }`}
      >
        过去一周
      </button>
    </div>
  );
}
