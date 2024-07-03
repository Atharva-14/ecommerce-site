import { removeItemFromCart } from "@/lib/services/cartService";

export default async function handler(req, res) {
  if (req.method === "POST") {
    const { userId, productId } = req.body;

    try {
      const cart = await removeItemFromCart(userId, productId);
      res.status(200).json({ success: true, cart });
    } catch (error) {
      res.status(500).json({ success: false, error: error.message });
    }
  } else {
    res.status(405).json({ message: "Method Not Allowed" });
  }
}
