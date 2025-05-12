import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import pickBy from 'lodash/pickBy';
import identity from 'lodash/identity';

export const fetchPizzas = createAsyncThunk(
  'pizza/fetchPizzasStatus',
    async (params) => {
      const { sortBy, order, category, search, currentPage } = params;
      console.log(params, 4444);
      const { data } = await axios.get(`https://681270ec129f6313e20e98c0.mockapi.io/pizzas`, {
        params: pickBy(
          {
            page: currentPage,
            limit: 4,
            category,
            sortBy,
            order,
            search,
          },
          identity,
        ),
      });

      return data;
    },
);