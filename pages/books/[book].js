import BookDetail from "@/components/BookDetail";
import { DUMMY_BOOKS_DATA } from "@/utils/data";
import { notFound } from "next/navigation";

export async function generateMetadata({ params }) {
  const id = parseInt(params.book);

  const book = DUMMY_BOOKS_DATA.find((book) => book.id === id);

  if (!book) {
    notFound();
  }

  return {
    title: book.title,
    description: book.description,
  };
}

export default function Book(props) {
  return (
    <div>
      <BookDetail props={props.book} />
    </div>
  );
}

export async function getStaticPaths() {
  const paths = DUMMY_BOOKS_DATA.map((book) => ({
    params: { book: book.id.toString() },
  }));

  return { paths, fallback: false };
}

export async function getStaticProps({ params }) {
  const id = parseInt(params.book);

  const book = DUMMY_BOOKS_DATA.find((book) => book.id === id);

  return {
    props: {
      book,
    },
  };
}
