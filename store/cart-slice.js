const { createSlice } = require("@reduxjs/toolkit");

const initialState = {
  books: [],
  totalQuantity: 0,
  totalCartValue: 0,
};

const cartSlice = createSlice({
  name: "cart",
  initialState: initialState,
  reducers: {
    addItemToCart(state, action) {
      const newBook = action.payload;
      const existingBook = state.books.find((book) => book.id === newBook.id);
      state.totalQuantity++;
      if (!existingBook) {
        state.books.push({
          id: newBook.id,
          title: newBook.title,
          imageUrl: newBook.imageUrl,
          author: newBook.author,
          price: newBook.price,
          quantity: 1,
          totalPrice: newBook.price,
        });
      } else {
        existingBook.quantity++;
        existingBook.totalPrice = existingBook.totalPrice + newBook.price;
      }
      state.totalCartValue = state.books.reduce(
        (total, book) => total + book.totalPrice,
        0
      );
    },
    removeItemFromCart(state, action) {
      const id = action.payload;
      const existingBook = state.books.find((book) => book.id === id);
      state.totalQuantity--;
      if (existingBook.quantity === 1) {
        state.books = state.books.filter((book) => book.id !== id);
      } else {
        existingBook.quantity--;
        existingBook.totalPrice = existingBook.totalPrice - existingBook.price;
      }
      state.totalCartValue = state.books.reduce(
        (total, book) => total + book.totalPrice,
        0
      );
    },
  },
});

export const cartActions = cartSlice.actions;

export default cartSlice;
