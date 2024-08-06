import { createSlice } from "@reduxjs/toolkit";
import { getWishlistItems } from "./async-thunk";

const initialState = {
  wishlistItem: [],
  loading: false,
  error: null,
};

const wishlistSlice = createSlice({
  name: "wishlist",
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getWishlistItems.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getWishlistItems.fulfilled, (state, action) => {
        state.loading = false;
        state.wishlistItem = action.payload.wishlistData;
      })
      .addCase(getWishlistItems.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const wishlistActions = wishlistSlice.actions;

export default wishlistSlice.reducer;
