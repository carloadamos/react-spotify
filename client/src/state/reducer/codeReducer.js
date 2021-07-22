import { createSlice } from '@reduxjs/toolkit';

export const codeSlice = createSlice({
  name: 'code',
  initialState: {
    value: '',
  },
  reducers: {
    setCode: (state, action) => {
      state.value = action.payload;
    },
  },
});

export const getCode = (state) => state.code.value;

export const { setCode } = codeSlice.actions;

export default codeSlice.reducer;
