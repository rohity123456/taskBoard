import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '@/store';
import { ITask } from '@/lib/types';

interface TasksState {
  tasks: ITask[];
  isLoading: boolean;
  error: string | null;
}

const initialState: TasksState = {
  tasks: [],
  isLoading: false,
  error: null
};

export const taskSlice = createSlice({
  name: 'tasks',
  initialState,
  reducers: {
    addTask: (state, action: PayloadAction<ITask>) => {
      state.tasks.push(action.payload);
    },
    setTasks: (state, action: PayloadAction<ITask[]>) => {
      state.tasks = action.payload;
    },
    updateTaskData: (state, action: PayloadAction<ITask>) => {
      const index = state.tasks.findIndex(
        (task) => task._id === action.payload._id
      );
      if (index !== -1) {
        state.tasks[index] = action.payload;
      }
    },
    deleteTask: (state, action: PayloadAction<string>) => {
      state.tasks = state.tasks.filter((task) => task._id !== action.payload);
    }
  }
});

export const { addTask, updateTaskData, deleteTask, setTasks } =
  taskSlice.actions;

// Other selectors as needed
export const selectAllTasks = (state: RootState) => state.tasks.tasks;
export const selectTasksByStatus = (state: RootState, status: string) =>
  state.tasks.tasks.filter((task) => task.status?._id === status);

export default taskSlice.reducer;
