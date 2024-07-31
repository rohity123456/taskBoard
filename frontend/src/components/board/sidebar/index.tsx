'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useSelector, useDispatch } from 'react-redux';
import { setActiveBoard } from '@/store/features/board/slice';
import {
  useCreateBoardMutation,
  useGetBoardsQuery
} from '@/store/features/board/api';
import { RootState } from '@/store';
import IconButton from '@/components/ui/iconButton';
import { AlignJustify, ClipboardList } from 'lucide-react';
import { IBoard } from '@/lib/types';
import Button from '@/components/ui/button';
import AddBoardModal from '../addBoard';
// import AddBoardModal from './forms/AddBoardModal';

const Sidebar: React.FC = () => {
  const dispatch = useDispatch();
  const {
    data: boardsResponse,
    isLoading,
    error
  } = useGetBoardsQuery({
    page: '1',
    pageSize: '10'
  });
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const activeBoardId = useSelector(
    (state: RootState) => state.boards.activeBoardId
  );
  const boards = boardsResponse?.data?.boards ?? [];

  const [isAddBoardModalOpen, setIsAddBoardModalOpen] = useState(false);

  const [isOpen, setIsOpen] = useState(false);

  const [createBoard, { isLoading: isCreatingBoard }] =
    useCreateBoardMutation();

  const handleBoardClick = (boardId: string) => {
    dispatch(setActiveBoard(boardId));
    setIsSidebarOpen(false); // Close sidebar on mobile after selection
  };

  const handleAddBoard = async (title: string) => {
    try {
      const newBoard = await createBoard({ title }).unwrap();
      setIsAddBoardModalOpen(false);
    } catch (error) {
      console.log(error);
    }
  };

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className='relative'>
      {!isOpen && (
        <IconButton
          className='md:hidden z-10 fixed left-3 top-3'
          icon={<AlignJustify />}
          onClick={toggleSidebar}
        />
      )}
      <aside
        className={`fixed md:relative p-2 top-0 left-0 h-screen w-64 bg-primary shadow-lg transform ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        } transition-transform duration-300 ease-in-out md:translate-x-0`}
      >
        <h2 className='text-2xl mb-2 font-bold text-purple-300'>Task Boards</h2>
        <div>
          {isLoading ? (
            <p>Loading boards...</p>
          ) : error ? (
            <p>Error loading boards</p>
          ) : (
            <BoardsList boards={boards} activeBoardId={activeBoardId || ''} />
          )}

          <Button
            onClick={() => setIsAddBoardModalOpen(true)}
            className='text-mainPurple gap-1'
            icon={<ClipboardList />}
          >
            Add Board
          </Button>
        </div>
      </aside>
      <div
        className={`fixed top-0 left-0 w-full h-full bg-black bg-opacity-0 z-40 ${
          isOpen ? 'block' : 'hidden'
        } md:hidden`}
        onClick={toggleSidebar}
      />
      <AddBoardModal
        isOpen={isAddBoardModalOpen}
        onClose={() => setIsAddBoardModalOpen(false)}
      />
    </div>
  );
};

export default Sidebar;

const BoardsList = ({
  boards,
  activeBoardId
}: {
  boards: IBoard[];
  activeBoardId: string;
}) => {
  return (
    <div className=''>
      <h3 className='text-sm uppercase text-textSecondary'>{`All Boards (${boards.length})`}</h3>
      <ul className='py-2'>
        {boards.map((board) => (
          <Link key={board._id} href={`/board/${board._id}`}>
            <li
              className={` 
                  flex text-textSecondary py-2 px-4 hover:text-white
                  ${
                    board._id === activeBoardId &&
                    'bg-mainPurple rounded-r-3xl text-white'
                  }
                `}
            >
              <ClipboardList className='mr-2' />
              {board.title}
            </li>
          </Link>
        ))}
      </ul>
    </div>
  );
};
