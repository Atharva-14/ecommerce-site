import BookCard from "@/components/BookCard";
import { useState } from "react";

export default function Home({ allBooksData }) {
  const [filteredResults, setFilteredResults] = useState(allBooksData);
  const [selectedValue, setSelectedValue] = useState("Featured");
  const [isOpen, setIsOpen] = useState(false);

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

  function toggleDropdown() {
    setIsOpen(!isOpen);
  }

  function handleOptionClick(value) {
    if (value === "featured") {
      setSelectedValue("Featured");
      setFilteredResults(allBooksData);
      setIsOpen(false);
    } else if (value === "lowToHigh") {
      setSelectedValue("Low to High");
      setFilteredResults(allBooksData.sort((a, b) => a.price - b.price));
      setIsOpen(false);
    } else if (value === "highToLow") {
      setSelectedValue("High to Low");
      setFilteredResults(allBooksData.sort((a, b) => b.price - a.price));
      setIsOpen(false);
    }
  }

  return (
    <div className="mx-2 my-1 flex w-full space-x-5">
      <div className="w-1/4 bg-white py-7 px-4 h-full flex flex-col space-y-5">
        <div>
          <div>
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
        <hr />
        <div>
          <div className="relative inline-block">
            <div
              className="select-selected bg-gray-200 px-4 py-2 rounded cursor-pointer"
              onClick={toggleDropdown}
            >
              {`Sort By: ${selectedValue}`}
            </div>
            <div
              className={`${
                isOpen ? "" : "hidden"
              } absolute bg-white min-w-40 shadow-md rounded z-10`}
            >
              <div
                className="py-2 px-4 cursor-pointer"
                onClick={() => handleOptionClick("featured")}
              >
                Featured
              </div>
              <div
                className="py-2 px-4 cursor-pointer"
                onClick={() => handleOptionClick("lowToHigh")}
              >
                Low to High
              </div>
              <div
                className="py-2 px-4 cursor-pointer"
                onClick={() => handleOptionClick("highToLow")}
              >
                High to Low
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="w-full overflow-y-auto flex flex-wrap gap-5">
        {filteredResults.map((book) => (
          <BookCard
            key={book._id}
            id={book._id}
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
  const res = await fetch("http://localhost:3000/api/books");
  const allBooksData = await res.json();

  return {
    props: {
      allBooksData,
    },
    revalidate: 10,
  };
}
