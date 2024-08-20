import BookDetail from "@/components/Book/BookDetail";
import axios from "axios";
import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export default function Book({ book, metadata }) {
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
      <Head>
        <title>{metadata.title}</title>
        <meta name="description" content={metadata.description} />
        <meta name="keywords" content={metadata.keywords} />
        <meta property="og:title" content={metadata.title} />
        <meta property="og:description" content={metadata.description} />
        <meta property="og:image" content={metadata.imageUrl} />
      </Head>
      <BookDetail props={data} />
    </div>
  );
}

export async function getServerSideProps({ params }) {
  const id = params.id;

  const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/books/${id}`);
  const book = res.data;

  const metadata = {
    title: book.title || "Book Detail",
    description: `Details about ${book.title}`,
    keywords: `${book.title}, books`,
    imageUrl: book.imageUrl || "/default-image.jpg",
  };

  return {
    props: {
      book,
      metadata,
    },
  };
}
