import { getBookByID } from "@/lib/services/bookService";
import { getCart } from "@/lib/services/cartService";

export default async function handler(req, res) {
  const { userId } = req.query;
  try {
    const cart = await getCart(userId);
    const cartBookDetails = await Promise.all(
      cart.cartItems.map(async (book) => {
        const bookDetailsDoc = await getBookByID(book.bookId);
        return {
          ...bookDetailsDoc,
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
}
