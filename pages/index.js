import BookCard from "@/components/Book/BookCard";
import { Separator } from "@/components/UI/separator";
import { getAllBooks } from "@/lib/services/bookService";
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
    <div className="min-h-screen flex bg-gray-100">
      <div className="w-1/5 bg-white my-4 py-3 px-2.5 h-full flex flex-col space-y-5">
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
        <Separator />
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
      <div className="flex flex-wrap w-11/12">
        {filteredResults.map((book) => (
          <div key={book._id} className="w-full sm:w-1/2 lg:w-1/3 p-4">
            <BookCard
              key={book._id}
              id={book._id}
              title={book.title}
              imageUrl={book.imageUrl}
              author={book.author}
              price={book.price}
            />
          </div>
        ))}
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
