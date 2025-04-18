import { configureStore } from '@reduxjs/toolkit';
import userReducer from './userSlice';
import adminReducer from './adminSlice';
import cartReducer from './cartSlice';

const store = configureStore({
  reducer: {
    user: userReducer,
    admin: adminReducer,
    cart: cartReducer,
  },
});

export default store;