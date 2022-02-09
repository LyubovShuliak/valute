import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import { convertReducer } from './conversion/convertSlice';

export const store = configureStore({
  reducer: {
    convert: convertReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
