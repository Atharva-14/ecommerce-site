import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { Input } from "./input";
import axios from "axios";
import debounce from "lodash.debounce";
import { SkeletonList } from "./Skeleton/SkeletonList";

export default function SearchModal({ open, onClose }) {
  const dialog = useRef();

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
    if (open) {
      dialog.current.showModal();
    } else {
      dialog.current.close();
    }

    debouncedFetchResults(query);

    return () => {
      debouncedFetchResults.cancel();
    };
  }, [open, query]);

  function handleInputBlur() {
    setTimeout(() => {
      setIsDivVisible(false);
    }, 100);
  }

  return (
    <dialog
      ref={dialog}
      onClose={onClose}
      className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50 z-50"
    >
      {open ? (
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
            {loading && (
              <div className="flex-col pt-4 space-y-5">
                <SkeletonList />
                <SkeletonList />
                <SkeletonList />
                <SkeletonList />
              </div>
            )}
            {error && <p style={{ color: "red" }}>{error}</p>}

            {isDivVisible && (
              <ul className="mt-2 space-y-2 overscroll-y-auto">
                {searchResults.map((book) => (
                  <li className="py-2 border-b text-white border-gray-300 last:border-b-0">
                    <Link
                      key={book._id}
                      href={`/books/${book._id}`}
                      className="w-full"
                      onClick={onClose}
                    >
                      {book.title} by {book.author}
                    </Link>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      ) : null}
    </dialog>
  );
}
