import Link from "next/link";
import CartButton from "../Cart/CartButton";
import { useEffect, useState } from "react";
import { DUMMY_BOOKS_DATA } from "@/utils/data";
import { usePathname } from "next/navigation";

export default function MainNavigation() {
  const path = usePathname();
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [isDivVisible, setIsDivVisible] = useState(false);

  const inactiveClass =
    "block mt-4 lg:inline-block lg:mt-0 hover:text-white px-4 py-2 rounded hover:bg-blue-700 mr-2";

  const activeClass =
    "block mt-4 lg:inline-block lg:mt-0 text-white px-4 py-2 rounded bg-blue-700 mr-2";

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
    setIsDivVisible(false);
  }

  return (
    <nav className="flex items-center justify-between flex-wrap bg-white py-4 lg:px-12 shadow border-solid border-t-2 border-blue-700">
      <div className="flex justify-between lg:w-auto w-full lg:border-b-0 pl-6 pr-2 border-solid border-b-2 border-gray-300 pb-5 lg:pb-0">
        <div className="flex items-center flex-shrink-0 text-gray-800 mr-16">
          <Link href="/" className="font-semibold text-xl tracking-tight">
            eBookHaven
          </Link>
        </div>
        <div className="block lg:hidden ">
          <button
            id="nav"
            className="flex items-center px-3 py-2 border-2 rounded text-blue-700 border-blue-700 hover:text-blue-700 hover:border-blue-700"
          >
            <svg
              className="fill-current h-3 w-3"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <title>Menu</title>
              <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z" />
            </svg>
          </button>
        </div>
      </div>

      <div className="menu w-full lg:block flex-grow lg:flex lg:items-center lg:w-auto lg:px-3 px-8">
        <div className="text-md font-bold text-blue-700 lg:flex-grow">
          <Link
            href="/"
            className={path === "/" ? `${activeClass}` : `${inactiveClass}`}
          >
            Home
          </Link>
          <Link
            href="/categories"
            className={
              path === "/categories" ? `${activeClass}` : `${inactiveClass}`
            }
          >
            Shop by Category
          </Link>
        </div>
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
            {/* <button
              className="px-2.5 py-1.5 bg-blue-700 text-white rounded"
              onClick={handleSearch}
            >
              Search
            </button> */}
          </div>
          {isDivVisible && (
            <ul
              className={` p-4 absolute bg-white min-w-40 shadow-md rounded z-10`}
            >
              {searchResults.map((book) => (
                <li
                  key={book.id}
                  className="py-2 border-b border-gray-300 last:border-b-0"
                >
                  {book.title} by {book.author}
                </li>
              ))}
            </ul>
          )}
        </div>

        <div className="flex text-blue-700 text-md font-bold">
          {/* <Link
            href="#"
            className="block text-md px-4 py-2 rounded text-blue-700 ml-2 font-bold hover:text-white mt-4 hover:bg-blue-700 lg:mt-0"
          >
            Signup/Login
          </Link> */}

          <CartButton />
        </div>
      </div>
    </nav>
  );
}
