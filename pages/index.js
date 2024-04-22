import BookCard from "@/components/BookCard";
import { DUMMY_BOOKS_DATA } from "@/utils/data";

export default function Home({ allBooksData }) {
  return (
    <div className="mx-2 my-1 flex w-full">
      <div className="w-1/4">Filter</div>
      <div className="w-3/4">
        {allBooksData.map((book) => (
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
    </div>
  );
}

export async function getStaticProps() {
  const allBooksData = DUMMY_BOOKS_DATA;

  return {
    props: {
      allBooksData,
    },
  };
}
