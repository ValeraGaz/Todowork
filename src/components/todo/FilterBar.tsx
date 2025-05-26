'use client';

import { useTodoStore, FilterType } from '@/store/todo-store';
import FilterButton from './FilterButton';

export default function FilterBar() {
  return (
    <div className="flex justify-center space-x-2 md:space-x-4 mb-6">
      <FilterButton filter="all">
        Всі
      </FilterButton>
      <FilterButton filter="active">
        Активні
      </FilterButton>
      <FilterButton filter="completed">
        Завершені
      </FilterButton>
    </div>
  );
}