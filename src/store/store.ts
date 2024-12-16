import { configureStore } from '@reduxjs/toolkit';
import dogsReducer from './dogsSlice';
import formReducer from './formSlice';

const store = configureStore({
  reducer: {
    dogs: dogsReducer,
    form: formReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
