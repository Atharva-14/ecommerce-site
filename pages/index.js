import Head from "next/head";
import Image from "next/image";
import girlWithBook from "@/public/girl_with_book.jpg";
import { getAllBooks } from "@/lib/services/bookService";
import { useEffect, useState, useRef } from "react";
import BestSellingCard from "@/components/Book/BestSellingCard";
import { useRouter } from "next/router";

export default function Home({ allBooksData }) {
  const [bestSellingBooks, setBestSellingBooks] = useState([]);
  const scrollContainerRef = useRef(null);
  const router = useRouter();

  useEffect(() => {
    const sortedBestSellingBooks = allBooksData
      .filter((book) => book.bestselling)
      .sort((a, b) => a.bestselling - b.bestselling);

    setBestSellingBooks(sortedBestSellingBooks);
  }, [allBooksData]);

  const scrollLeft = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: -300, behavior: "smooth" });
    }
  };

  const scrollRight = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: 300, behavior: "smooth" });
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center bg-gray-100">
      <Head>
        <title>Home - eBookHeaven</title>
        <meta
          name="description"
          content="Welcome to the home page of eBookHeaven. Explore our features and offerings."
        />
        <meta name="robots" content="index, follow" />
        <meta property="og:title" content="Home - eBookHeaven" />
        <meta
          property="og:description"
          content="Welcome to the home page of eBookHeaven. Explore our features and offerings."
        />
      </Head>

      {/* Header Image */}
      <Image
        src={girlWithBook}
        alt="Girl with book"
        className="w-5/6 mx-auto cursor-pointer"
        onClick={() => router.push("/store")}
      />

      {/* Best Selling Section */}
      <div className="w-full px-4 py-8 flex flex-col items-center">
        <h2 className="text-3xl font-bold mb-4">Best Selling Books</h2>
        <div className="relative w-full flex items-center">
          <button
            onClick={scrollLeft}
            className="absolute left-0 z-10 bg-gray-200 text-gray-700 rounded-full h-12 w-12 flex items-center justify-center opacity-70 hover:opacity-100 transition-opacity"
          >
            <i className="bx bx-left-arrow-alt text-xl"></i>
          </button>

          <div
            ref={scrollContainerRef}
            className="flex overflow-x-auto space-x-4 w-full px-12 py-2"
          >
            {bestSellingBooks.map((book) => (
              <div key={book._id} className="flex-none w-80">
                <BestSellingCard
                  id={book._id}
                  title={book.title}
                  imageUrl={book.imageUrl}
                  author={book.author}
                  price={book.price}
                  bestselling={book.bestselling}
                />
              </div>
            ))}
          </div>

          <button
            onClick={scrollRight}
            className="absolute right-0 z-10 bg-gray-200 text-gray-700 rounded-full h-12 w-12 flex items-center justify-center opacity-70 hover:opacity-100 transition-opacity"
          >
            <i className="bx bx-right-arrow-alt text-xl"></i>
          </button>
        </div>
      </div>
    </div>
  );
}

export async function getStaticProps() {
  let allBooksData = await getAllBooks();

  return {
    props: {
      allBooksData: JSON.parse(JSON.stringify(allBooksData)),
    },
  };
}
