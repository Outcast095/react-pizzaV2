import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';
import { RootState } from '../store';

export type SearchPizzaParams = {
  order: string
  sortBy: string
  category: string
  search: string
  paginationPage: string
}

export type PizzaItem = {
  category: number
  id: number
  imageUrl: string
  price: number
  rating?: number
  sizes: number[]
  types: number[]
  title: string
}


type FetchPizzasArgs = Record<string, string>

export const fetchPizzas = createAsyncThunk<PizzaItem[], SearchPizzaParams>(
  'pizza/fetchPizzasStatus',
  async (params) => {

    const {order, sortBy, category, search, paginationPage} = params;

    const { data } = await axios.get<PizzaItem[]>(
      `https://681270ec129f6313e20e98c0.mockapi.io/pizzas?page=${paginationPage}&limit=4&${category}${search}&sortBy=${sortBy}&order=${order}`
    );
    return data;
  },

);

enum Status {
   LOADING = 'loading',
  SUCCESS = 'success',
  ERROR = 'error',

}

interface PizzasState {
  items: PizzaItem[],
  status: Status,
}

const initialState: PizzasState = {
  items: [],
  status: Status.LOADING , // loading | success | error
};

const slice = createSlice({
  name: 'pizza',
  initialState,
  reducers: {
    setItems(state, action: PayloadAction<PizzaItem[]>) {
      state.items = action.payload;
    },
  },

  extraReducers: (builder) => {
    builder.addCase(fetchPizzas.pending, (state, action) => {
      state.status = Status.LOADING;
      state.items = [];
    });

    builder.addCase(fetchPizzas.fulfilled, (state, action) => {
      state.items = action.payload;
      state.status = Status.SUCCESS;
    });

    builder.addCase(fetchPizzas.rejected, (state, action) => {
      state.status = Status.ERROR;
      state.items = [];
    });
  },
});

export const selectPizzaData = (state: RootState) => state.pizza;


export const { setItems } = slice.actions;

export default slice.reducer;