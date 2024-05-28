import { getBookByID } from "../services/bookService";
import {
  addItemToCart,
  getCart,
  removeItemFromCart,
} from "../services/cartService";

export const getCartHandler = async (req, res) => {
  const { userId } = req.query;
  try {
    const cart = await getCart(userId);

    const cartBookDetails = await Promise.all(
      cart.cartItems.map(async (book) => {
        const bookDetailsDoc = await getBookByID(book.bookId);
        const bookDetails = bookDetailsDoc.toObject(); // Convert Mongoose document to plain object
        return {
          ...bookDetails,
          quantity: book.quantity,
        };
      })
    );

    res.status(200).json({
      success: true,
      cartItems: cartBookDetails,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch cart",
      error: error.message,
    });
  }
};

export const addItemToCardHandler = async (req, res) => {
  const { userId, productId, quantity } = req.body;

  try {
    const cart = await addItemToCart(userId, productId, quantity);
    res.status(200).json({ success: true, cart });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

export const removeItemFromCartHandler = async (req, res) => {
  const { userId, productId } = req.body;

  try {
    const cart = await removeItemFromCart(userId, productId);
    res.status(200).json({ success: true, cart });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};
