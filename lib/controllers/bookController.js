import { getAllBooks, getBookByID } from "../services/bookService";

export async function getAllBooksHandler(req, res) {
  try {
    const books = await getAllBooks();
    res.status(200).json(books);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to fetch books", error: error.message });
  }
}

export async function getBookByIDHandler(req, res) {
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
}
