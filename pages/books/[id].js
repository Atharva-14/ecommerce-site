import BookDetail from "@/components/Book/BookDetail";
import axios from "axios";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export default function Book({ book }) {
  const router = useRouter();
  const { id } = router.query;

  const [data, setData] = useState(book);

  useEffect(() => {
    fetchBook();
  }, [id]);

  async function fetchBook() {
    const res = await axios.get(
      `${process.env.NEXT_PUBLIC_API_URL}/books/${id}`
    );
    const book = res.data;

    setData(book);
  }

  return (
    <div className=" min-h-full">
      <BookDetail props={data} />
    </div>
  );
}

export async function getServerSideProps({ params }) {
  const id = params.id;

  const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/books/${id}`);
  const book = res.data;

  return {
    props: {
      book,
    },
  };
}
