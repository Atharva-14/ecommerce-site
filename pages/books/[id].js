import BookDetail from "@/components/BookDetail";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

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

export async function getServerSideProps({ params }) {
  const id = params.id;

  const res = await fetch(`http://localhost:3000/api/books/${id}`);
  const book = await res.json();

  return {
    props: {
      book,
    },
  };
}
