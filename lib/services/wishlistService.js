import connectDB from "@/utils/db";
import Wishlist from "../models/Wishlist";

export const getWishlist = async (userId) => {
  await connectDB();

  try {
    const wishlist = await Wishlist.findOne({ userId });

    if (!wishlist) {
      throw new Error("Wishlist not found");
    }

    return wishlist;
  } catch (error) {
    throw new Error("Failed to fetch wishlist: ", error.message);
  }
};

export const toggleWishlistItems = async (userId, bookId, type) => {
  await connectDB();

  try {
    const currentWishlist = await Wishlist.findOne({ userId });

    switch (type) {
      case "REMOVE":
        currentWishlist.wishlistItem.pull(bookId);
        await currentWishlist.save();

        return currentWishlist;

      case "ADD":
        if (!currentWishlist) {
          const newWishlist = await Wishlist.create({
            userId,
            wishlistItem: [bookId],
          });
          await newWishlist.save();

          return newWishlist;
        } else {
          currentWishlist.wishlistItem.push(bookId);
          await currentWishlist.save();

          return currentWishlist;
        }
    }
  } catch (error) {
    throw new Error(error.message);
  }
};
