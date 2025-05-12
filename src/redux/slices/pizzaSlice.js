import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import pickBy from 'lodash/pickBy';
import identity from 'lodash/identity';
//import { fetchPizzas } from './asyncActions';
//import { Pizza, PizzaSliceState, Status } from './types';

export const fetchPizzas = createAsyncThunk(
  'pizza/fetchPizzasStatus',
  async (params) => {

    const {order, sortBy, category, search, paginationPage} = params;

    const { data } = await axios.get(
      `https://681270ec129f6313e20e98c0.mockapi.io/pizzas?page=${paginationPage}&limit=4&${category}${search}&sortBy=${sortBy}&order=${order}`
    );
    return data;
  },

);


const initialState = {
  items: [],
  status: "loading", // loading | success | error
};

const pizzaSlice = createSlice({
  name: 'pizza',
  initialState,
  reducers: {
    setItems(state, action) {
      state.items = action.payload;
    },
  },

  extraReducers: (builder) => {
    builder.addCase(fetchPizzas.pending, (state, action) => {
      state.status = "loading";
      state.items = [];
    });

    builder.addCase(fetchPizzas.fulfilled, (state, action) => {
      state.items = action.payload;
      state.status = "success";
    });

    builder.addCase(fetchPizzas.rejected, (state, action) => {
      state.status = "error";
      state.items = [];
    });
  },
});

export const { setItems } = pizzaSlice.actions;

export default pizzaSlice.reducer;