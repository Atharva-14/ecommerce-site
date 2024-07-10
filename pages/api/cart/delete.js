import { deleteCart } from "@/lib/services/cartService";

export default async function handler(req, res) {
  if (req.method === "DELETE") {
    return deleteCart(req, res);
  } else {
    res.status(405).json({ message: "Method Not Allowed" });
  }
}
