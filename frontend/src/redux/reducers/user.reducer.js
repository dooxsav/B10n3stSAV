import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  status: ""
}

const userSlice = createSlice({
  name: 'counter',
  initialState: initialState,
  reducers: {
    increment(state) {
      return state + 1;
    },
    decrement(state) {
      return state - 1;
    },
  },
});

export const { increment, decrement } = userSlice.actions;

export default userSlice.reducer;
