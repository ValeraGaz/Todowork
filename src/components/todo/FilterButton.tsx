import { useTodoStore, FilterType } from '@/store/todo-store';

interface FilterButtonProps {
  filter: FilterType;
  children: React.ReactNode;
}

export default function FilterButton({ filter, children }: FilterButtonProps) {
  const currentFilter = useTodoStore((state) => state.filter);
  const setFilter = useTodoStore((state) => state.setFilter);
  
  const isActive = currentFilter === filter;
  
  return (
    <button
      onClick={() => setFilter(filter)}
      className={`
        px-4 py-2 rounded-md text-sm font-medium transition-all duration-200
        ${isActive 
          ? 'bg-blue-600 text-white shadow-md transform scale-105' 
          : 'bg-gray-100 text-gray-700 hover:bg-gray-200 hover:text-gray-900'
        }
        focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500
      `}
      aria-pressed={isActive}
    >
      {children}
    </button>
  );
}