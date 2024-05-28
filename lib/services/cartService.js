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

    console.log("This is item index: ", itemIndex);

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
