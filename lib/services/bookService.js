import connectDB from "@/utils/db";
import Book from "../models/Book";

export async function getAllBooks(category = null) {
  await connectDB();
  try {
    const query = {};
    if (category) {
      query.category = category;
    }
    const books = await Book.find(query).lean();
    return books;
  } catch (error) {
    throw new Error("Failed to fetch books");
  }
}

export async function getBookByID(id) {
  try {
    const book = await Book.findById(id).lean();
    return book;
  } catch (error) {
    throw new Error("Failed to fetch book by ID");
  }
}

export async function searchBook(query) {
  const searchCriteria = {
    $or: [
      { title: { $regex: query, $options: "i" } },
      { author: { $regex: query, $options: "i" } },
      { category: { $regex: query, $options: "i" } },
    ],
  };

  return Book.find(searchCriteria);
}

export async function getAllCategory() {
  await connectDB();

  return Book.distinct("category").lean();
}
