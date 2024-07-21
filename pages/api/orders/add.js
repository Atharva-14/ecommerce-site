import { getCart } from "@/lib/services/cartService";
import { findUserById } from "@/lib/services/userService";

export default async function handler(req, res) {
  if (req.method === "POST") {
    const { userId, totalAmount, addressId, paymentMethod } = req.body;

    const user = await findUserById(userId);

    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }

    const address = user.address.id(addressId);

    if (!address) {
      return res
        .status(404)
        .json({ success: false, message: "Address not found" });
    }

    const cart = await getCart(userId);
    const cartItem = { item: cart.cartItems };

    console.log(cartItem);

    const newOrder = {
      ...cartItem,
      totalAmount,
      address: address.toObject(),
      paymentMethod,
    };

    console.log(newOrder);

    user.pastOrders.push(newOrder);

    await user.save();

    res
      .status(200)
      .json({ success: true, user, message: "Orders updated successfully" });
  } else {
    res.status(400).json({ success: false, message: "Method not allowed" });
  }
}
