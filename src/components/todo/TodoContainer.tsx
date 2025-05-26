'use client';

import AddTaskForm from './AddTaskForm';
import FilterBar from './FilterBar';
import TaskList from './TaskList';

export default function TodoContainer() {
  return (
    <div className="w-full max-w-2xl mx-auto p-4 sm:p-6">
      <div className="bg-white rounded-xl shadow-xl p-4 sm:p-6 md:p-8">
        <h1 className="text-2xl sm:text-3xl font-bold text-center mb-6 text-blue-600">
          Список завдань
        </h1>
        
        <AddTaskForm />
        <FilterBar />
        <TaskList />
      </div>
    </div>
  );
}