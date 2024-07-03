import { searchBook } from "@/lib/services/bookService";

export default async function handler(req, res) {
  if (req.method === "GET") {
    const { query } = req.query;

    if (!query) {
      return res.status(400).json({ message: "Query parameter is missing" });
    }

    try {
      const books = await searchBook(query);
      res.status(200).json(books);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  } else {
    res.status(405).json({ message: "Method not allowed" });
  }
}
