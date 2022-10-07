import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import cartItems from '../../cartItems'
import axios from 'axios'

const url = 'https://course-api.com/react-useReducer-cart-project'

const initialState = {
  cartItems: cartItems,
  items: 0,
  total: 0, 
  isLoading: true, 
}

export const getCartItems = createAsyncThunk(
  'cart/getCartItems',
  async() =>{
    // const res = await fetch(url)
    // const formattedResponse =  await res.json()
    // return formattedResponse;

    try {
      const res = await axios(url);
      return res.data;
    } catch (error) {
      
    }
  }
)

export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
   clearCart: (state) => {
     state.cartItems = []
   },
   removeItem: (state, action) => {
    const itemId = action.payload;
      state.cartItems = state.cartItems.filter((item) => item.id !== itemId)
   },
   increase:  (state, action) => {
    
    const cartItem =  state.cartItems.find((item) => item.id === action.payload);
    console.log(cartItem)
    cartItem.items ++

    
   },
   decrease:  (state, {payload}) => {
    const cartItem = state.cartItems.find((item) => item.id === payload.id);
    cartItem.items --
    
   },
   calculateTotals: (state) => {
      let items = 0;
      let total = 0;
      // console.log(state)
      state.cartItems.forEach((item) => {
        // console.log('amount', item)
        items += item.items; //items = items+ item.items
        total += item.items * item.price;
      });
      state.items = items;
      state.total = total;
    },
  },
  extraReducers: {
    [getCartItems.pending] : (state, action) => {
      state.isLoading = true
    },
    [getCartItems.fulfilled] : (state, action) => {
      state.cart = action.payload
      state.isLoading = false
    },
    [getCartItems.rejected] : (state, action) => {
      state.isLoading = false
    }
  }
})



export const { clearCart, removeItem, increase, decrease, calculateTotals} = cartSlice.actions


export default cartSlice.reducer