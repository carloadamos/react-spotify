import { createSlice } from '@reduxjs/toolkit';

export const categorySlice = createSlice({
  name: 'category',
  initialState: {
    value: [],
    selected: {},
  },
  reducers: {
    setCategories: (state, action) => {
      state.value = action.payload;
    },
    setSelectedCategory: (state, action) => {
      state.selected = action.payload;
    },
  },
});

export const getCategories = (state) => state.category.value;

export const getSelectedCategory = (state) => state.category.selecte;

export const { setCategories, setSelectedCategory } = categorySlice.actions;

export default categorySlice.reducer;
