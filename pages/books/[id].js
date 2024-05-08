import BookDetail from "@/components/BookDetail";
import { DUMMY_BOOKS_DATA } from "@/utils/data";
import { notFound } from "next/navigation";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export async function generateMetadata({ params }) {
  const id = parseInt(params.id);

  const book = DUMMY_BOOKS_DATA.find((book) => book.id === id);

  if (!book) {
    notFound();
  }

  return {
    title: book.title,
    description: book.description,
  };
}

export default function Book({ book }) {
  const router = useRouter();
  const { id } = router.query;

  const [data, setData] = useState(book);

  useEffect(() => {
    if (!book) {
      fetchBook();
    }
  }, []);

  async function fetchBook() {
    const res = await fetch(`http://localhost:3000/api/books/${id}`);
    const book = await res.json();

    setData(book);
  }

  return (
    <div>
      <BookDetail props={data} />
    </div>
  );
}

// export async function getStaticPaths() {
//   const res = await fetch("http://localhost:3000/api/books/");
//   const books = await res.json();

//   const paths = books.map((book) => ({
//     params: { id: JSON.stringify(book._id) },
//   }));

//   return { paths, fallback: false };
// }

export async function getServerSideProps({ params }) {
  const id = params.id;

  const res = await fetch(`http://localhost:3000/api/books/${id}`);
  const book = await res.json();

  // const book = DUMMY_BOOKS_DATA.find((book) => book.id === id);

  return {
    props: {
      book,
    },
  };
}
