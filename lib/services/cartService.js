import connectDB from "@/utils/db";
import Cart from "../models/Cart";

export const getCart = async (userId) => {
  await connectDB();

  try {
    const cart = await Cart.findOne({ userId });

    if (!cart) {
      throw new Error("Cart not found");
    }
    return cart;
  } catch (error) {
    throw new Error("Failed to fetch cart: ", error.message);
  }
};

export const addItemToCart = async (userId, productId, quantity = 1) => {
  await connectDB();

  try {
    let cart = await Cart.findOne({ userId });

    if (!cart) {
      cart = new Cart({ userId, cartItems: [] });
    }

    const itemIndex = cart.cartItems.findIndex(
      (book) => book.bookId.toString() === productId
    );

    if (itemIndex > -1) {
      cart.cartItems[itemIndex].quantity += quantity;
    } else {
      cart.cartItems.push({ bookId: productId, quantity });
    }

    await cart.save();

    return cart;
  } catch (error) {
    throw new Error("Failed to add item to cart: " + error.message);
  }
};

export const deleteCart = async (req, res) => {
  const { userId } = req.body;

  if (!userId) {
    return res.status(400).json({ message: "User ID is required." });
  }

  try {
    await Cart.findOneAndDelete({ userId });
    return res.status(200).json({ message: "Cart deleted successfully." });
  } catch (error) {
    console.error("Error deleting cart:", error);
    return res.status(500).json({ message: "Internal server error." });
  }
};

export const removeItemFromCart = async (userId, productId) => {
  await connectDB();

  try {
    const cart = await Cart.findOne({ userId });

    if (!cart) {
      throw new Error("Cart not found");
    }

    const cartItem = cart.cartItems.find(
      (item) => item.bookId.toString() === productId
    );

    if (!cartItem) {
      throw new Error("Book not found in cart");
    }

    if (cartItem.quantity > 1) {
      cartItem.quantity -= 1;
    } else {
      cart.cartItems = cart.cartItems.filter(
        (item) => item.bookId.toString() !== productId
      );
    }

    await cart.save();

    return cart;
  } catch (error) {
    throw new Error("Failed to remove item from cart: " + error.message);
  }
};
