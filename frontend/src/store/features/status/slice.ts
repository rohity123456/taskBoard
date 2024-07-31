import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '@/store';
import { IStatus } from '@/lib/types';

interface StatusesState {
  statuses: IStatus[];
  isLoading: boolean;
  error: string | null;
}

const initialState: StatusesState = {
  statuses: [],
  isLoading: false,
  error: null
};

export const statusSlice = createSlice({
  name: 'statuses',
  initialState,
  reducers: {
    setStatuses: (state, action: PayloadAction<IStatus[]>) => {
      state.statuses = action.payload;
    }
  }
});

export const { setStatuses } = statusSlice.actions;

export const selectAllStatuses = (state: RootState) => state.statuses.statuses;

export default statusSlice.reducer;
