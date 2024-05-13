import BookCard from "@/components/BookCard";

export default function Category({ books }) {
  return (
    <div className="flex flex-wrap">
      {books.map((book) => (
        <BookCard
          key={book._id}
          id={book._id}
          title={book.title}
          imageUrl={book.imageUrl}
          author={book.author}
          price={book.price}
        />
      ))}
    </div>
  );
}

export async function getStaticPaths() {
  const res = await fetch("http://localhost:3000/api/books");
  const allBooksData = await res.json();

  const categories = [
    ...new Set(
      allBooksData.map((book) => ({
        params: {
          category: book.category,
        },
      }))
    ),
  ];

  return {
    paths: categories,
    fallback: false,
  };
}

export async function getStaticProps({ params }) {
  const category = params.category;

  const res = await fetch("http://localhost:3000/api/books");
  const allBooksData = await res.json();

  const bookCategory = [];

  allBooksData.map((book) => {
    if (book.category === category) {
      bookCategory.push(book);
    }
  });

  return {
    props: {
      books: bookCategory,
    },
  };
}
