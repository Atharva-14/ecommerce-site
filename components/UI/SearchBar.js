import { DUMMY_BOOKS_DATA } from "@/utils/data";
import Link from "next/link";
import { useEffect, useState } from "react";
import { Input } from "./input";
import axios from "axios";
import debounce from "lodash.debounce";

export default function SearchBar() {
  const [query, setQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [isDivVisible, setIsDivVisible] = useState(false);

  const fetchResults = async (searchQuery) => {
    if (!searchQuery) {
      setSearchResults([]);
      return;
    }

    setLoading(true);
    setError("");
    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/books/search`,
        { params: { query: searchQuery } }
      );
      setIsDivVisible(true);
      setSearchResults(response.data);
    } catch (error) {
      setError("Error fetching search results.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const debouncedFetchResults = debounce(fetchResults, 300);

  useEffect(() => {
    debouncedFetchResults(query);

    return () => {
      debouncedFetchResults.cancel();
    };
  }, [query]);

  function handleInputBlur() {
    setTimeout(() => {
      setIsDivVisible(false);
    }, 100);
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-75 z-50 flex flex-col items-center p-5 ">
      <div className="w-full max-w-2xl p-4 bg-gray-800 rounded-lg shadow-lg">
        <Input
          className="border-2 border-gray-300 bg-white h-10 pl-2 pr-8 rounded-lg text-sm focus:outline-none"
          type="text"
          value={query}
          placeholder="Search for books..."
          onChange={(e) => setQuery(e.target.value)}
          onBlur={handleInputBlur}
        />
        {loading && <p className="text-white">Loading...</p>}
        {error && <p style={{ color: "red" }}>{error}</p>}

        {isDivVisible && (
          <ul className="mt-2 space-y-2 overscroll-y-auto">
            {searchResults.map((book) => (
              <li className="py-2 border-b text-white border-gray-300 last:border-b-0">
                <Link key={book._id} href={`/books/${book._id}`} className="w-full">
                  {book.title} by {book.author}
                </Link>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
