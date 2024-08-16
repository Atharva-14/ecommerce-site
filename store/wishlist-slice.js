import { createSlice } from "@reduxjs/toolkit";
import { getWishlistItems, toggleWishlistItems } from "./async-thunk";

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
    //Handling fetch wishlist items
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

    //Handling toggle wishlist item
    builder
      .addCase(toggleWishlistItems.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(toggleWishlistItems.fulfilled, (state, action) => {
        state.loading = false;
        const { bookId, type } = action.payload;

        if (type === "ADD") {
          state.wishlistItem.push(action.payload.book);
        } else if (type === "REMOVE") {
          state.wishlistItem = state.wishlistItem.filter(
            (item) => item._id !== bookId
          );
        }
      })
      .addCase(toggleWishlistItems.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const wishlistActions = wishlistSlice.actions;

export default wishlistSlice.reducer;
