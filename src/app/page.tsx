'use client';
import TodoContainer from '@/components/todo/TodoContainer';

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-12 px-4">
      <TodoContainer />
    </main>
  );
}