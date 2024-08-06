import { toggleWishlistItems } from "@/lib/services/wishlistService";

export default async function handler(req, res) {
  if (req.method === "POST") {
    const { userId, bookId, type } = req.body;

    try {
      const wishlist = await toggleWishlistItems(userId, bookId, type);
      res.status(200).json({ success: true, wishlist });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: "Failed to toogle wishlist item",
        error: error.message,
      });
    }
  }else{
    res.status(405).json({success: false, message: 'Method not allowed'})
  }
}
