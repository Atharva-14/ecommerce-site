const { ObjectId } = require("mongodb");
const { default: mongoose } = require("mongoose");

const cartSchema = new mongoose.Schema({
  userId: {
    type: ObjectId,
    required: true,
  },
  cartItems: [
    {
      bookId: { type: ObjectId, required: true },
      quantity: { type: Number, default: 1 },
    },
  ],
});

const Cart = mongoose.models.Cart || mongoose.model("Cart", cartSchema);

export default Cart;
