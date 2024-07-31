import { TaskInput } from '@/components/task/taskmodal/schema';
import { ITask } from './types';

export const truncateText = (text: string, length: number) => {
  if (text.length > length) {
    return `${text.slice(0, length)}...`;
  }
  return text;
};

export const getEditingTask = (task: ITask): TaskInput => {
  return {
    title: task.title,
    description: task.description,
    status: task.status._id,
    boardId: task.boardId,
    _id: task._id
  };
};
