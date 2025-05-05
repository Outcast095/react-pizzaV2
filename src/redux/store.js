import { configureStore } from '@reduxjs/toolkit';
import { useDispatch } from 'react-redux';
import filter from './slices/filterSlice';

export const store = configureStore({
  reducer: {
    filter
  },
});


export const useAppDispatch = () => useDispatch();