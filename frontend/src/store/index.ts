import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { baseApi } from './baseAPI';
import { boardSlice } from './features/board/slice';
import { taskSlice } from './features/task/slice';
import { statusSlice } from './features/status/slice';

const initialState = {
  [boardSlice.name]: boardSlice.getInitialState(),
  [taskSlice.name]: taskSlice.getInitialState(),
  [statusSlice.name]: statusSlice.getInitialState()
};

const appReducer = combineReducers({
  [baseApi.reducerPath]: baseApi.reducer,
  [boardSlice.reducerPath]: boardSlice.reducer,
  [taskSlice.reducerPath]: taskSlice.reducer,
  [statusSlice.reducerPath]: statusSlice.reducer
});

const reducerProxy = (state: any, action: any) => {
  if (action.type === 'logout') {
    return appReducer(initialState as any, action);
  }
  return appReducer(state, action);
};

export const store = configureStore({
  reducer: reducerProxy,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(baseApi.middleware)
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
