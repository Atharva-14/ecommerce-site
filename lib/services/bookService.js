import connectDB from "@/utils/db";
import Book from "../models/Book";

export async function getAllBooks() {
  await connectDB();
  try {
    const books = await Book.find();
    return books;
  } catch (error) {
    throw new Error("Failed to fetch books");
  }
}

export async function getBookByID(id) {
  try {
    const book = await Book.findById(id);
    return book;
  } catch (error) {
    throw new Error("Failed to fetch book by ID");
  }
}
