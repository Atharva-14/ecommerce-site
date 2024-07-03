import { getBookByID } from "@/lib/services/bookService";
import connectDB from "@/utils/db";

export default async function handler(req, res) {
  await connectDB();

  if (req.method === "GET") {
    const { id } = req.query;
    try {
      const book = await getBookByID(id);
      if (!book) {
        return res.status(400).json({ message: "Book not found" });
      }
      res.status(200).json(book);
    } catch (error) {
      res
        .status(500)
        .json({ message: "Failed to fetch book by ID", error: error.message });
    }
  } else {
    res.status(405).json({ message: "Method not allowed" });
  }
}
