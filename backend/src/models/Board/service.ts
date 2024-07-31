import { catchException } from '@/utils/helper';
import Board from '.';
import { IBoard } from './types';

export const createBoard = async (board: Partial<IBoard>): Promise<IBoard> => {
  try {
    const boardObj = await Board.create(board);
    return boardObj.toObject();
  } catch (e: any) {
    catchException(e);
    throw new Error('Error creating board');
  }
};

export const updateBoard = async (
  boardId: string,
  board: IBoard
): Promise<IBoard | null> => {
  try {
    const updatedBoard = await Board.findOneAndUpdate({ _id: boardId }, board, {
      new: true
    });
    return updatedBoard?.toObject() || null;
  } catch (e: any) {
    catchException(e);
    return null;
  }
};

export const getBoards = async (
  filters: any,
  pageNo: number,
  pageSize: number
): Promise<[IBoard[], number]> => {
  try {
    const boards = await Board.find(filters)
      .skip((pageNo - 1) * pageSize)
      .sort({ createdAt: -1 })
      .limit(pageSize);
    const total = await Board.countDocuments(filters);
    return [boards.map((board) => board.toObject()), total];
  } catch (e: any) {
    catchException(e);
    return [[], 0];
  }
};

export const getBoard = async (boardId: string): Promise<IBoard | null> => {
  try {
    const board = await Board.findOne({ _id: boardId });
    return board?.toObject() || null;
  } catch (e: any) {
    catchException(e);
    return null;
  }
};
