import {
  addItemToCart,
  deleteCart,
  getCartItems,
  removeItemFromCart,
} from "./async-thunk";

const { createSlice } = require("@reduxjs/toolkit");

const initialState = {
  bookCart: [],
  totalQuantity: 0,
  totalCartValue: 0,
  loading: false,
  error: null,
};

const cartSlice = createSlice({
  name: "cart",
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getCartItems.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getCartItems.fulfilled, (state, action) => {
        state.loading = false;
        state.bookCart = action.payload.cartItems;
        state.totalQuantity = action.payload.totalQuantity;
        state.totalCartValue = action.payload.totalPrice;
      })
      .addCase(getCartItems.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(addItemToCart.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addItemToCart.fulfilled, (state, action) => {
        state.loading = false;
        const { productId, price, quantity = 1 } = action.payload;

        const exisitingItem = state.bookCart.find(
          (item) => item._id === productId
        );

        if (exisitingItem) {
          exisitingItem.quantity += quantity;
        }

        state.totalQuantity += 1;
        state.totalCartValue += price;
      })
      .addCase(addItemToCart.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(removeItemFromCart.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(removeItemFromCart.fulfilled, (state, action) => {
        state.loading = false;
        const { productId, price } = action.payload;
        const exisitingItem = state.bookCart.find(
          (item) => item._id === productId
        );

        if (exisitingItem) {
          exisitingItem.quantity -= 1;

          if (exisitingItem.quantity === 0) {
            state.bookCart = state.bookCart.filter(
              (item) => item._id !== productId
            );
          }

          state.totalQuantity -= 1;
          state.totalCartValue -= price;
        }
      })
      .addCase(removeItemFromCart.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(deleteCart.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteCart.fulfilled, (state, action) => {
        state.loading = false;
        state.bookCart = [];
        state.totalQuantity = 0;
        state.totalCartValue = 0;
      })
      .addCase(deleteCart.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const cartActions = cartSlice.actions;

export default cartSlice.reducer;
