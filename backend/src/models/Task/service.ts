import { catchException } from '@/utils/helper';
import Task from '.';
import { ITask } from './types';

export const createTask = async (task: Partial<ITask>): Promise<ITask> => {
  try {
    const taskObj = await Task.create(task);
    return taskObj.toObject();
  } catch (e: any) {
    catchException(e);
    throw new Error('Error creating task');
  }
};

export const updateTask = async (
  taskId: string,
  task: ITask
): Promise<ITask | null> => {
  try {
    const updatedTask = await Task.findOneAndUpdate({ _id: taskId }, task, {
      new: true
    }).populate('status');
    return updatedTask?.toObject() || null;
  } catch (e: any) {
    catchException(e);
    return null;
  }
};

export const getTasks = async (
  filters: any,
  pageNo: number,
  pageSize: number
): Promise<[ITask[], number]> => {
  try {
    const tasks = await Task.find(filters, {})
      .populate('status')
      .skip((pageNo - 1) * pageSize)
      .sort({ createdAt: -1 })
      .limit(pageSize);
    const total = await Task.countDocuments(filters);
    return [tasks.map((task) => task.toObject()), total];
  } catch (e: any) {
    catchException(e);
    return [[], 0];
  }
};

export const deleteTask = async (taskId: string): Promise<boolean> => {
  try {
    await Task.deleteOne({ _id: taskId });
    return true;
  } catch (e: any) {
    catchException(e);
    return false;
  }
};
