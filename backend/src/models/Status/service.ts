import { catchException } from '@/utils/helper';
import Status from '.';
import { IStatus } from './types';

export const createStatus = async (
  status: Partial<IStatus>
): Promise<IStatus> => {
  try {
    const statusObj = await Status.create(status);
    return statusObj.toObject();
  } catch (e: any) {
    catchException(e);
    throw new Error('Error creating status');
  }
};

export const updateStatus = async (
  statusId: string,
  status: IStatus
): Promise<IStatus | null> => {
  try {
    const updatedStatus = await Status.findOneAndUpdate({ statusId }, status, {
      new: true
    });
    return updatedStatus?.toObject() || null;
  } catch (e: any) {
    catchException(e);
    return null;
  }
};

export const getStatuses = async (
  filters: any,
  pageNo: number,
  pageSize: number
): Promise<[IStatus[], number]> => {
  try {
    const statuss = await Status.find(filters)
      .skip((pageNo - 1) * pageSize)
      .sort({ createdAt: -1 })
      .limit(pageSize);
    const total = await Status.countDocuments(filters);
    return [statuss.map((status) => status.toObject()), total];
  } catch (e: any) {
    catchException(e);
    return [[], 0];
  }
};

export const deleteStatus = async (statusId: string): Promise<boolean> => {
  try {
    await Status.deleteOne({ statusId });
    return true;
  } catch (e: any) {
    catchException(e);
    return false;
  }
};
