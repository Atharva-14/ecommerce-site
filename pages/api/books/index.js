import { getAllBooksHandler } from "@/lib/controllers/bookController";

export default async function handler(req, res) {
  if (req.method === "GET") {
    await getAllBooksHandler(req, res);
  } else {
    res.status(405).json({ message: "Method not allowed" });
  }
}
