import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IBoard } from '@/lib/types';
import { RootState } from '@/store';

interface BoardsState {
  boards: IBoard[];
  activeBoardId: string | null;
}

const initialState: BoardsState = {
  boards: [],
  activeBoardId: null
};

export const boardSlice = createSlice({
  name: 'boards',
  initialState,
  reducers: {
    setBoards: (state, action: PayloadAction<IBoard[]>) => {
      state.boards = action.payload;
      if (!state.activeBoardId && action.payload.length > 0) {
        state.activeBoardId = action.payload[0]._id;
      }
    },
    setActiveBoard: (state, action: PayloadAction<string | null>) => {
      console.log('Set active board', action.payload);
      state.activeBoardId = action.payload;
    },
    addBoard: (state, action: PayloadAction<IBoard>) => {
      state.boards.push(action.payload);
    },
    updateBoard: (state, action: PayloadAction<IBoard>) => {
      const index = state.boards.findIndex(
        (board) => board._id === action.payload._id
      );
      if (index !== -1) {
        state.boards[index] = action.payload;
      }
    },
    deleteBoard: (state, action: PayloadAction<string>) => {
      state.boards = state.boards.filter(
        (board) => board._id !== action.payload
      );
    }
  }
});

export const { setBoards, setActiveBoard, addBoard, updateBoard, deleteBoard } =
  boardSlice.actions;

export const selectBoards = (state: RootState) => state.boards.boards;

export const selectActiveBoard = (state: RootState) =>
  state.boards.activeBoardId;

export default boardSlice.reducer;
