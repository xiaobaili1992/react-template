import { configureStore } from '@reduxjs/toolkit';
import counterReducer from './counterSlice';
import { State } from './counterSlice';

interface CounterState {
  counter: State;
}

const store = configureStore({
  reducer: {
    counter: counterReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;

export type { CounterState };
