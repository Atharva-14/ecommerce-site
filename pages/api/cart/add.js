import { addItemToCart } from "@/lib/services/cartService";

export default async function handler(req, res) {
  if (req.method === "POST") {
    const { userId, productId, quantity } = req.body;

    try {
      const cart = await addItemToCart(userId, productId, quantity);
      res.status(200).json({ success: true, cart });
    } catch (error) {
      res.status(500).json({ success: false, error: error.message });
    }
  } else {
    res.status(405).json({ success: false, message: "Method Not Allowed" });
  }
}
