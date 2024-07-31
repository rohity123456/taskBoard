'use client';

import TaskBoard from '@/components/task/tasksBoard';
import { setActiveBoard } from '@/store/features/board/slice';
import { useParams } from 'next/navigation';
import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';

const Board = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  useEffect(() => {
    if (!id) return;
    dispatch(setActiveBoard(id as string));
  }, [id]);
  return (
    <div>
      <TaskBoard />
    </div>
  );
};

export default Board;
