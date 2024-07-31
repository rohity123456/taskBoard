'use client';

import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { TaskInput, taskSchema } from './schema';
import { useAppDispatch } from '@/store/hooks';
import { useGetStatusesQuery } from '@/store/features/status/api';
import {
  useCreateTaskMutation,
  useUpdateTaskMutation
} from '@/store/features/task/api';
import { IStatus } from '@/lib/types';
import Modal from '@/components/ui/modal';
import { addTask, updateTaskData } from '@/store/features/task/slice';
import Button from '@/components/ui/button';

interface TaskModalProps {
  isOpen: boolean;
  onClose: () => void;
  boardId: string;
  editingTask: TaskInput | null;
  isEditing?: boolean;
  setEditingTask: (task: TaskInput | null) => void;
}

const TaskModal: React.FC<TaskModalProps> = ({
  isOpen,
  onClose,
  boardId,
  editingTask,
  setEditingTask,
  isEditing = false
}) => {
  const dispatch = useAppDispatch();
  const { data: statusData } = useGetStatusesQuery();
  const [createTask, { isLoading: isCreating }] = useCreateTaskMutation();
  const [updateTask, { isLoading: isUpdating }] = useUpdateTaskMutation();
  const statuses = statusData?.data.statuses || [];
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
    setValue
  } = useForm<TaskInput>({
    resolver: zodResolver(taskSchema),
    defaultValues: editingTask || {
      title: '',
      description: '',
      status: statuses?.[0]?._id,
      boardId: boardId,
      _id: ''
    }
  });

  useEffect(() => {
    if (editingTask) {
      setValue('title', editingTask.title);
      setValue('description', editingTask.description);
      setValue('status', editingTask.status || '');
      setValue('boardId', editingTask._id || '');
    }
  }, [editingTask, setValue]);

  if (isEditing && !editingTask) return null;

  const onSubmit = async (data: TaskInput) => {
    try {
      if (isEditing) {
        const updatedTaskData = await updateTask({
          ...data,
          _id: editingTask?._id || data._id || 'NOID'
        }).unwrap();

        const updatedTask = updatedTaskData.data;
        dispatch(
          updateTaskData({
            ...updatedTask,
            status: statuses?.find(
              (s) => s._id === updatedTask.status._id
            ) as IStatus
          })
        );
      } else {
        const newTaskData = await createTask({
          ...data,
          boardId: boardId
        }).unwrap();

        const newTask = newTaskData.data;
        dispatch(addTask(newTask));
      }

      onClose();
      reset();
      setEditingTask(null);
    } catch (error) {
      console.error('Error creating/updating task:', error);
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={() => {
        onClose();
        setEditingTask(null);
      }}
    >
      <form onSubmit={handleSubmit(onSubmit)} className='space-y-4'>
        <h2 className='text-lg font-medium mb-2'>
          {editingTask ? 'Edit Task' : 'Create Task'}
        </h2>
        <div>
          <label
            htmlFor='title'
            className='block text-sm font-medium text-white'
          >
            Title
          </label>
          <input
            type='text'
            id='title'
            {...register('title')}
            className='mt-1 block w-full p-2 text-primary rounded-md border-gray-300 shadow-sm sm:text-sm'
          />
          {errors.title && (
            <p className='text-red-500 text-sm mt-1'>{errors.title.message}</p>
          )}
        </div>
        <div>
          <label
            htmlFor='description'
            className='block text-sm font-medium text-white'
          >
            Description
          </label>
          <textarea
            id='description'
            {...register('description')}
            className='mt-1 block w-full rounded-md p-2 text-primary border-gray-300 shadow-sm sm:text-sm'
          />
        </div>
        <div>
          <label
            htmlFor='status'
            className='block text-sm font-medium text-white'
          >
            Status
          </label>
          <select
            id='status'
            {...register('status')}
            className='mt-1 block w-full rounded-md  p-2 text-primary border-gray-300 shadow-sm sm:text-sm'
          >
            {statuses?.map((status) => (
              <option key={status._id} value={status._id}>
                {status.name}
              </option>
            ))}
          </select>
        </div>

        <div className='flex justify-end'>
          <Button
            type='submit'
            disabled={isCreating || isUpdating}
            className='bg-mainPurple hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'
          >
            {isCreating || isUpdating ? 'Saving...' : 'Save'}
          </Button>
        </div>
      </form>
    </Modal>
  );
};

export default TaskModal;
