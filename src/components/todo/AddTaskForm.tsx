'use client';

import { useRef } from 'react';
import { useTodoStore } from '@/store/todo-store';

export default function AddTaskForm() {
  const inputRef = useRef<HTMLInputElement>(null);
  const addTask = useTodoStore((state) => state.addTask);
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (inputRef.current && inputRef.current.value.trim() !== '') {
      addTask(inputRef.current.value);
      inputRef.current.value = '';
      inputRef.current.focus();
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mb-6 w-full">
      <div className="flex w-full shadow-sm">
        <input
          ref={inputRef}
          type="text"
          placeholder="Що потрібно зробити?"
          className="flex-grow p-3 border-y border-l border-gray-300 rounded-l-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
        />
        <button 
          type="submit"
          className="bg-blue-600 text-white px-4 py-3 rounded-r-lg hover:bg-blue-700 active:bg-blue-800 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-700 focus:ring-offset-2"
          aria-label="Додати задачу"
        >
          Додати
        </button>
      </div>
    </form>
  );
}