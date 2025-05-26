'use client';

import { useTodoStore, Task } from '@/store/todo-store';
import { motion } from 'framer-motion';

interface TaskItemProps {
  task: Task;
}

export default function TaskItem({ task }: TaskItemProps) {
  const toggleTask = useTodoStore((state) => state.toggleTask);
  const deleteTask = useTodoStore((state) => state.deleteTask);
  
  // Форматування дати
  const formattedDate = new Intl.DateTimeFormat('uk-UA', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  }).format(task.createdAt);

  return (
    <motion.div 
      layout
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.2 }}
      className={`
        flex items-center p-4 border rounded-lg mb-2 
        ${task.completed 
          ? 'bg-gray-50 border-gray-200' 
          : 'bg-white border-gray-300'
        }
        transition-all duration-200 hover:shadow-md
      `}
    >
      <div className="flex-shrink-0">
        <input
          type="checkbox"
          checked={task.completed}
          onChange={() => toggleTask(task.id)}
          className="h-5 w-5 rounded border-gray-300 text-blue-600 focus:ring-blue-500 cursor-pointer"
        />
      </div>
      
      <div className="ml-3 flex-grow">
        <p className={`
          text-sm sm:text-base font-medium
          ${task.completed 
            ? 'line-through text-gray-500' 
            : 'text-gray-900'
          }
          transition-all duration-200
        `}>
          {task.text}
        </p>
        <p className="text-xs text-gray-500 mt-1">
          {formattedDate}
        </p>
      </div>
      
      <button
        onClick={() => deleteTask(task.id)}
        className="ml-2 p-2 text-red-500 hover:text-red-700 focus:outline-none rounded-full hover:bg-red-50 transition-colors"
        aria-label="Видалити задачу"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
          <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
        </svg>
      </button>
    </motion.div>
  );
}