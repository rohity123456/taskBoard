'use client';

import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'next/navigation';
import { RootState } from '@/store';
import { useGetBoardQuery } from '@/store/features/board/api';
import {
  useCreateTaskMutation,
  useUpdateTaskMutation
} from '@/store/features/task/api';
import Sidebar from '@/components/board/sidebar';
import Header from '@/components/board/header';
import TaskModal from '@/components/task/taskmodal';
import { TaskInput } from '@/components/task/taskmodal/schema';
import Loading from '@/components/ui/loading';

export default function BoardLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { id: boardId } = useParams();
  const [isTaskModalOpen, setIsTaskModalOpen] = useState(false);
  const [editingTask, setEditingTask] = useState<TaskInput | null>(null);
  const {
    data: boardData,
    isLoading: isLoadingBoard,
    error: boardError
  } = useGetBoardQuery(boardId as string, {
    skip: !boardId
  });
  const board = boardData?.data;
  if (isLoadingBoard) {
    return <Loading />;
  }

  return (
    <div className='flex h-screen'>
      <Sidebar />
      <div className='flex flex-1 flex-col h-screen'>
        <Header onAddTaskClick={() => setIsTaskModalOpen(true)} board={board} />
        <main className='p-4 bg-secondary flex-1'>{children}</main>
      </div>

      <TaskModal
        isOpen={isTaskModalOpen}
        onClose={() => {
          setIsTaskModalOpen(false);
          setEditingTask(null);
        }}
        boardId={boardId as string}
        editingTask={editingTask}
        setEditingTask={setEditingTask}
      />
    </div>
  );
}
