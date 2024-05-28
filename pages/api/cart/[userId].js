import { getCartHandler } from "@/lib/controllers/cartController";

export default async function handler(req, res) {
  if (req.method === "GET") {
    await getCartHandler(req, res);
  } else {
    res.status(405).json({ message: "Method not allowed" });
  }
}
