import { getBookByID } from "@/lib/services/bookService";
import { getWishlist } from "@/lib/services/wishlistService";

export default async function handler(req, res) {
  const { userId } = req.query;
  try {
    const wishlist = await getWishlist(userId);
    const wishlistBookDetails = await Promise.all(
      wishlist.wishlistItem.map(async (book) => {
        const bookDetailsDoc = await getBookByID(book._id);
        return { ...bookDetailsDoc };
      })
    );

    res.status(200).json({ success: true, wishlist: wishlistBookDetails });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch wishlist",
      error: error.message,
    });
  }
}
