'use client';

import Button from '@/components/ui/button';
import { IBoard } from '@/lib/types';
import { MenuIcon, Plus } from 'lucide-react';
import React from 'react';

interface HeaderProps {
  onAddTaskClick: () => void;
  board?: IBoard;
}

const Header: React.FC<HeaderProps> = ({ board, onAddTaskClick }) => {
  if (!board) return null;
  return (
    <header className='bg-primary flex justify-between items-center gap-2 p-2 px-4'>
      <h2 className='text-2xl text-white font-semibold'>{board?.title}</h2>
      <div className='flex gap-2 items-center'>
        <Button
          icon={<Plus />}
          className='bg-mainPurple text-white w-[150px]'
          onClick={onAddTaskClick}
        >
          Add Task
        </Button>
        <MenuIcon className='w-6 h-6 text-textSecondary' />
      </div>
    </header>
  );
};

export default Header;
