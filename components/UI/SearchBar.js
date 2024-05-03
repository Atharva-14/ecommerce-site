import { DUMMY_BOOKS_DATA } from "@/utils/data";
import Link from "next/link";
import { useState } from "react";

export default function SearchBar() {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [isDivVisible, setIsDivVisible] = useState(false);

  function handleSearch(event) {
    const inputValue = event.target.value;
    setSearchTerm(inputValue);

    if (inputValue.length >= 0) {
      setIsDivVisible(true);
      const filteredResults = DUMMY_BOOKS_DATA.filter(
        (book) =>
          book.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          book.author.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setSearchResults(filteredResults);
    }
  }

  function handleInputBlur() {
    setTimeout(() => {
      setIsDivVisible(false);
    }, 100);
  }
  return (
    <div className="mr-2">
      <div className="flex space-x-3">
        <input
          className="border-2 border-gray-300 bg-white h-10 pl-2 pr-8 rounded-lg text-sm focus:outline-none"
          type="search"
          value={searchTerm}
          placeholder="Search"
          onChange={handleSearch}
          onBlur={handleInputBlur}
        />
      </div>
      {isDivVisible && (
        <ul
          className={` p-4 absolute bg-white min-w-40 shadow-md rounded z-10`}
        >
          {searchResults.map((book) => (
            <li className="py-2 border-b border-gray-300 last:border-b-0">
              <Link key={book.id} href={`/books/${book.id}`}>
                {book.title} by {book.author}
              </Link>
            </li>
            // <li
            //   key={book.id}
            //   className="py-2 border-b border-gray-300 last:border-b-0"
            // >
            //   {book.title} by {book.author}
            // </li>
          ))}
        </ul>
      )}
    </div>
  );
}
