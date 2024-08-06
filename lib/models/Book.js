const { default: mongoose } = require("mongoose");

const bookSchema = new mongoose.Schema({
  title: {
    type: String,
    required: "Book name is required",
  },
  author: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  imageUrl: {
    type: String,
    required: "Book name is required",
  },
  category: {
    type: String,
    required: true,
  },
});

bookSchema.index({ category: 1 });

const Book = mongoose.models?.Book || mongoose.model("Book", bookSchema);

module.exports = Book;
