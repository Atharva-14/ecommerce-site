const mongoose = require("mongoose");
const { ObjectId } = require("mongodb");

const wishlistSchema = new mongoose.Schema(
  {
    userId: {
      type: ObjectId,
      ref: "User",
      required: true,
    },
    wishlistItem: [
      {
        type: ObjectId,
        ref: "Book",
        required: true,
      },
    ],
  },
  {
    timestamps: true, // Add timestamps for createdAt and updatedAt fields
  }
);

const Wishlist =
  mongoose.models.Wishlist || mongoose.model("Wishlist", wishlistSchema);

module.exports = Wishlist;
