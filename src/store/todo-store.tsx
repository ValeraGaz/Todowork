import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

export interface Task {
  id: string;
  text: string;
  completed: boolean;
  createdAt: Date;
}

export type FilterType = 'all' | 'active' | 'completed';

interface TodoStore {
  tasks: Task[];
  filter: FilterType;
  addTask: (text: string) => void;
  toggleTask: (id: string) => void;
  deleteTask: (id: string) => void;
  setFilter: (filter: FilterType) => void;
}


export const useTodoStore = create<TodoStore>()(
  persist(
    (set, get) => ({
      tasks: [],
      filter: 'all',

      addTask: (text: string) => {
        if (text.trim() === '') return;
        
        const newTask: Task = {
          id: Date.now().toString(),
          text: text.trim(),
          completed: false,
          createdAt: new Date(),
        };
        
        set((state) => ({
          tasks: [...state.tasks, newTask],
        }));
      },

      toggleTask: (id: string) => {
        set((state) => ({
          tasks: state.tasks.map((task) =>
            task.id === id ? { ...task, completed: !task.completed } : task
          ),
        }));
      },

      deleteTask: (id: string) => {
        set((state) => ({
          tasks: state.tasks.filter((task) => task.id !== id),
        }));
      },

      setFilter: (filter: FilterType) => {
        set({ filter });
      },
    }),
    {
      name: 'todo-storage',
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({
        tasks: state.tasks.map((task) => ({
          ...task,
          createdAt: task.createdAt.toISOString(),
        })),
        filter: state.filter,
      }),
      onRehydrateStorage: () => (state) => {
        if (state && state.tasks) {
          state.tasks = state.tasks.map((task: any) => ({
            ...task,
            createdAt: new Date(task.createdAt),
          }));
        }
      },
    }
  )
);