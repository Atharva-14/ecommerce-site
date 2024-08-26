import BookDetail from "@/components/Book/BookDetail";
import SkeletonDetails from "@/components/UI/Skeleton/SkeletonDetails";
import { getBookByID } from "@/lib/services/bookService";
import axios from "axios";
import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export default function Book({ book, metadata }) {
  const router = useRouter();
  const { id } = router.query;

  const [data, setData] = useState(book);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchBook();
  }, [id]);

  async function fetchBook() {
    setLoading(true);
    try {
      const res = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/books/${id}`
      );
      const book = res.data;

      setData(book);
    } catch (error) {
      console.log("Failed to fecth book details: ", error.message);
    } finally {
      setLoading(false);
    }
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
      {loading && (
        <div>
          <SkeletonDetails />
        </div>
      )}
      <BookDetail props={data} />
    </div>
  );
}

export async function getServerSideProps({ params }) {
  const id = params.id;

  const book = await getBookByID(id);

  const metadata = {
    title: book.title || "Book Detail",
    description: `Details about ${book.title}`,
    keywords: `${book.title}, books`,
    imageUrl: book.imageUrl || "/default-image.jpg",
  };

  return {
    props: {
      book: JSON.stringify(book),
      metadata,
    },
  };
}
