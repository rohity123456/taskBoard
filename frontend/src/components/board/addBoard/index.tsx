'use client';

import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useAppDispatch } from '@/store/hooks';
import { BoardInput, boardSchema } from './schema';
import { useCreateBoardMutation } from '@/store/features/board/api';
import { addBoard } from '@/store/features/board/slice';
import Modal from '@/components/ui/modal';

interface AddBoardModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const AddBoardModal: React.FC<AddBoardModalProps> = ({ isOpen, onClose }) => {
  const dispatch = useAppDispatch();
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<BoardInput>({
    resolver: zodResolver(boardSchema)
  });

  const [createBoard, { isLoading }] = useCreateBoardMutation();

  const onSubmit = async (data: BoardInput) => {
    try {
      const newBoard = await createBoard(data).unwrap();
      dispatch(addBoard(newBoard));
      onClose();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <form onSubmit={handleSubmit(onSubmit)} className='space-y-4'>
        <h2 className='text-lg font-medium mb-2'>Add a Board</h2>
        <div>
          <label htmlFor='title' className='block text-sm font-medium '>
            Board Title
          </label>
          <input
            type='text'
            id='title'
            {...register('title')}
            className={`mt-1 block w-full py-3 px-2 rounded-md text-primary border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm ${
              errors.title ? 'border-red-500' : ''
            }`}
            placeholder='Enter board title'
          />

          {errors.title && (
            <p className='text-red-500 text-sm mt-1'>{errors.title.message}</p>
          )}
        </div>
        <div className='flex justify-end'>
          <button
            type='submit'
            disabled={isLoading}
            className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'
          >
            {isLoading ? 'Creating...' : 'Create'}
          </button>
        </div>
      </form>
    </Modal>
  );
};

export default AddBoardModal;
