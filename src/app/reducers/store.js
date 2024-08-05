import { configureStore } from '@reduxjs/toolkit';

// Reducers
import cartReducer from '../reducers/cart/cartSlice';

export default configureStore({
  reducer: {
    cart: cartReducer
  }
})