import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

//Cart

export const getCartItems = createAsyncThunk(
  "cart/getCartItems",
  async (userId, { rejectWithValue }) => {
    try {
      const res = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/cart/${userId}`
      );

      const response = res.data;

      const totalQuantity = response.cartItems.reduce(
        (total, book) => total + book.quantity,
        0
      );

      const totalPrice = response.cartItems.reduce(
        (total, book) => total + book.price * book.quantity,
        0
      );

      return {
        cartItems: response.cartItems,
        totalQuantity,
        totalPrice,
      };
    } catch (error) {
      console.log("Failed to fetch cart");
      return rejectWithValue(error.message);
    }
  }
);

export const addItemToCart = createAsyncThunk(
  "cart/addItemToCart",
  async ({ userId, productId, quantity, price }, { rejectWithValue }) => {
    try {
      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/cart/add`,
        {
          userId,
          productId,
          quantity,
        }
      );

      const response = res.data;

      return { productId, quantity, price };
    } catch (error) {
      console.log("Add to cart err: ", error.message);

      return rejectWithValue(error.message);
    }
  }
);

export const removeItemFromCart = createAsyncThunk(
  "cart/removeItemFromCart",
  async ({ userId, productId, price }, { rejectWithValue }) => {
    try {
      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/cart/remove`,
        {
          userId,
          productId,
        }
      );

      return { productId, price };
    } catch (error) {
      console.log("Remove from cart error:", error.message);

      return rejectWithValue(error.message);
    }
  }
);

export const deleteCart = createAsyncThunk(
  "cart/deleteCart",
  async (userId, { rejectWithValue }) => {
    try {
      const res = await axios.delete(
        `${process.env.NEXT_PUBLIC_API_URL}/cart/delete`,
        {
          data: { userId },
        }
      );
    } catch (error) {
      console.log("Delete cart error:", error.message);

      return rejectWithValue(error.message);
    }
  }
);

//Wishlist

export const getWishlistItems = createAsyncThunk(
  "wishlist/getWishlistItems",
  async (userId, { rejectWithValue }) => {
    try {
      const res = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/wishlist/${userId}`
      );

      const response = res.data;

      return { wishlistData: response.wishlist };
    } catch (error) {
      console.log("Failed to fetch wishlist");

      return rejectWithValue(error.message);
    }
  }
);

export const toggleWishlistItems = createAsyncThunk(
  "wishlist/toggleWishlistItems",
  async ({ userId, bookId, type }, { rejectWithValue }) => {
    try {
      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/wishlist/toggleList`,
        {
          userId,
          bookId,
          type,
        }
      );

      return {
        book: res.data.bookData,
        bookId,
        type,
      };
    } catch (error) {
      console.log("Failed to toogle wishlist item");

      return rejectWithValue(error.message);
    }
  }
);
