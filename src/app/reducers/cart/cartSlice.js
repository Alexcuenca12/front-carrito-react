//Usamos la herramienta redux
import { createSlice } from '@reduxjs/toolkit';
//Estado inicial del carrito
const initialState = {
  totalCount: 0,
  productsList: [],
}

export const cartSlice = createSlice({
  name: 'cart',
  initialState: initialState,
  //Operacions o reducers: 
  reducers: {
    //Añadimos un producto y sumamos a la cantidad total
    addProductToCart: (state, action) => {
      state.productsList = [...state.productsList, action.payload];
      state.totalCount += 1;
    },
    //Eliminamos un producto y restamos de la cantidad
    removeProductFromCart: (state, action) => {
      const productId = action.payload;
      state.totalCount -= 1;
      state.productsList = state.productsList.filter(product => product.producto.id_producto !== productId);
    },
  }
})

// Action creators are generated for each case reducer function
export const { addProductToCart, removeProductFromCart } = cartSlice.actions;

export default cartSlice.reducer;