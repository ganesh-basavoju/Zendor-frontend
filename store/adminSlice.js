import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isAuthenticated: false,
  adminInfo: null,
};

const adminSlice = createSlice({
  name: 'admin',
  initialState,
  reducers: {
    login(state, action) {
      state.isAuthenticated = true;
      state.adminInfo = action.payload;
    },
    logout(state) {
      state.isAuthenticated = false;
      state.adminInfo = null;
    },
  },
});

export const { login, logout } = adminSlice.actions;
export default adminSlice.reducer;