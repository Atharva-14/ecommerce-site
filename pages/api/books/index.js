import { getAllBooksHandler } from "@/lib/controllers/bookController";

export default async function handler(req, res) {
  if (req.method === "GET") {
    try {
      const books = await getAllBooks();
      res.status(200).json(books);
    } catch (error) {
      res
        .status(500)
        .json({ message: "Failed to fetch books", error: error.message });
    }
  } else {
    res.status(405).json({ message: "Method not allowed" });
  }
}
