'use client';

import { useTodoStore } from '@/store/todo-store';
import TaskItem from './TaskItem';
import { useMemo } from 'react';

export default function TaskList() {
  const tasks = useTodoStore((state) => state.tasks);
  const filter = useTodoStore((state) => state.filter);
  
  const filteredTasks = useMemo(() => {
    switch (filter) {
      case 'active':
        return tasks.filter((task) => !task.completed);
      case 'completed':
        return tasks.filter((task) => task.completed);
      default:
        return tasks;
    }
  }, [tasks, filter]);
  
  const activeTasksCount = useMemo(() => {
    return tasks.filter((task) => !task.completed).length;
  }, [tasks]);
  
  const totalTasksCount = tasks.length;
  
  return (
    <div className="w-full">
      <div className="mb-4">
        {filteredTasks.length === 0 ? (
          <div className="text-center p-6 bg-gray-50 rounded-lg border border-gray-200">
            <p className="text-gray-500">Немає завдань для відображення</p>
          </div>
        ) : (
          filteredTasks.map((task) => (
            <TaskItem key={task.id} task={task} />
          ))
        )}
      </div>
      
      {totalTasksCount > 0 && (
        <div className="text-sm text-gray-500 text-center">
          {activeTasksCount} залишилось / {totalTasksCount} всього
        </div>
      )}
    </div>
  );
}