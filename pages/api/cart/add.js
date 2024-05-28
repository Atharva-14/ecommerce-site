import { addItemToCardHandler } from "@/lib/controllers/cartController";

export default async function handler(req, res) {
  if (req.method === "POST") {
    await addItemToCardHandler(req, res);
  } else {
    res.status(405).json({ message: "Method Not Allowed" });
  }
}
