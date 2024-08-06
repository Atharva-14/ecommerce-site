import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "./cart-slice";
import wishlistReducer from "./wishlist-slice";

const store = configureStore({
  reducer: {
    cart: cartReducer,
    wishlist: wishlistReducer,
  },
});

export default store;
