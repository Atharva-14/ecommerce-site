import BookCard from "@/components/BookCard";
import { DUMMY_BOOKS_DATA } from "@/utils/data";

export default function Category(props) {
  return (
    <div className="flex flex-wrap">
      {props.books.map((book) => (
        <BookCard
          key={book.id}
          id={book.id}
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
  const categories = [
    ...new Set(
      DUMMY_BOOKS_DATA.map((book) => ({
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

  const bookCategory = [];
  const book = DUMMY_BOOKS_DATA.map((book) => {
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
