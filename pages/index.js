import BookCard from "@/components/BookCard";
import { DUMMY_BOOKS_DATA } from "@/utils/data";
import { useState } from "react";

export default function Home({ allBooksData }) {
  const [filteredResults, setFilteredResults] = useState(allBooksData);

  function handlePriceOverFiveHundred() {
    const data = allBooksData.filter((book) => book.price > 500);

    setFilteredResults(data);
  }

  function handlePriceBetweenTwoToFiveHundred() {
    const data = allBooksData.filter(
      (book) => book.price > 200 && book.price < 500
    );
    setFilteredResults(data);
  }

  function handleRemoveFilter() {
    setFilteredResults(allBooksData);
  }

  return (
    <div className="mx-2 my-1 flex w-full">
      <div className="w-1/4">
        <div className="px-2.5 ">
          <div className="flex justify-between">
            <p className="font-semibold mb-2">Price</p>
            <p
              className="w-fit cursor-pointer hover:text-orange-400"
              onClick={handleRemoveFilter}
            >
              Remove Filter
            </p>
          </div>
          <p
            className="w-fit cursor-pointer hover:text-orange-400"
            onClick={handlePriceBetweenTwoToFiveHundred}
          >
            ₹200 - ₹500
          </p>
          <p
            className="w-fit cursor-pointer hover:text-orange-400"
            onClick={handlePriceOverFiveHundred}
          >
            Over ₹500
          </p>
        </div>
      </div>
      <div className="w-3/4 overflow-y-auto h-screen">
        {filteredResults.map((book) => (
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
