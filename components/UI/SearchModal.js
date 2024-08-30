import { useEffect, useRef, useState } from "react";
import axios from "axios";
import debounce from "lodash.debounce";
import { SkeletonList } from "./Skeleton/SkeletonList";
import { Input } from "./input";
import { useRouter } from "next/router";

export default function SearchModal({ open, onClose }) {
  const dialog = useRef();
  const router = useRouter();

  const [query, setQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [isDivVisible, setIsDivVisible] = useState(false);
  const [recentSearches, setRecentSearches] = useState([]);
  const [showRecentSearches, setShowRecentSearches] = useState(true);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const savedSearches = localStorage.getItem("recentSearches");
      if (savedSearches) {
        setRecentSearches(JSON.parse(savedSearches));
      }
    }
  }, []);

  const fetchResults = async (searchQuery) => {
    if (!searchQuery.trim()) {
      setSearchResults([]);
      setIsDivVisible(false);
      return;
    }

    setLoading(true);
    setError("");

    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/books/search`,
        { params: { query: searchQuery } }
      );

      setTimeout(() => {
        setIsDivVisible(true);
        setSearchResults(response.data);
        setLoading(false);
        updateRecentSearches(searchQuery);
      }, 1000);
    } catch (error) {
      setError("Error fetching search results.");
      console.error(error);
      setLoading(false);
    }
  };

  const debouncedFetchResults = debounce(fetchResults, 500);

  useEffect(() => {
    if (open) {
      dialog.current.showModal();
    } else {
      dialog.current.close();
      setQuery("");
    }

    if (query.trim()) {
      debouncedFetchResults(query);
    } else {
      setIsDivVisible(false);
    }

    return () => {
      debouncedFetchResults.cancel();
    };
  }, [open, query]);

  function handleInputBlur() {
    setTimeout(() => {
      setIsDivVisible(false);
    }, 100);
  }

  const updateRecentSearches = (newSearch) => {
    setRecentSearches((prevSearches) => {
      const updatedSearches = [
        newSearch,
        ...prevSearches.filter((s) => s !== newSearch),
      ].slice(0, 5);
      if (typeof window !== "undefined") {
        localStorage.setItem("recentSearches", JSON.stringify(updatedSearches));
      }
      return updatedSearches;
    });
  };

  const clearRecentSearches = () => {
    setRecentSearches([]);
    if (typeof window !== "undefined") {
      localStorage.removeItem("recentSearches");
    }
  };

  const handleRecentSearchClick = (search) => {
    setQuery(search);
    setShowRecentSearches(false);
    debouncedFetchResults(search);
  };

  const handleInputChange = (e) => {
    const newValue = e.target.value;
    setQuery(newValue);
    setShowRecentSearches(newValue.trim() === "");
  };

  return (
    <dialog ref={dialog} onClose={onClose}>
      {open ? (
        <div className="fixed inset-0 bg-black bg-opacity-75 z-50 flex items-start justify-center p-4 pt-12">
          <div className="w-full max-w-3xl p-4 bg-white rounded-lg shadow-lg overflow-y-auto max-h-[90vh] relative">
            <button
              onClick={onClose}
              className="absolute top-0 right-2 text-4xl text-gray-600 md:hidden"
            >
              &times;
            </button>
            <div className="flex items-center border-2 border-gray-300 p-1 mt-6 rounded-lg">
              <i className="bx bx-search text-2xl"></i>
              <Input
                className="border-none px-3 py-2 text-xl font-medium focus:outline-none focus:border-transparent focus:ring-0 focus:ring-offset-0 focus:ring-opacity-0"
                type="text"
                value={query}
                placeholder="Search for books..."
                onChange={handleInputChange}
                onBlur={handleInputBlur}
              />
            </div>
            {loading && (
              <div className="flex-col pt-4 space-y-5">
                <SkeletonList />
                <SkeletonList />
                <SkeletonList />
                <SkeletonList />
              </div>
            )}
            {error && <p className="text-red-500">{error}</p>}

            {/* Search Results */}
            {isDivVisible && query.trim() && (
              <div className="w-full mt-4 overflow-y-auto max-h-[50vh] scrollbar-thin scrollbar-thumb-gray-700 scrollbar-track-gray-300">
                <ul className="w-full space-y-2">
                  {searchResults.map((book) => (
                    <li
                      className="py-2 w-full border-b border-gray-300 last:border-b-0"
                      key={book._id}
                    >
                      <div
                        className="w-full cursor-pointer"
                        onClick={() => {
                          router.push(`/books/${book._id}`);
                          onClose();
                        }}
                      >
                        {book.title} by {book.author}
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Recent Searches */}
            {showRecentSearches && (
              <div className="mt-4">
                <h4 className="mb-2">Recent Searches</h4>
                {recentSearches.length > 0 ? (
                  <ul className="space-y-2 overflow-y-auto">
                    {recentSearches.map((search, index) => (
                      <li
                        key={index}
                        className="cursor-pointer text-blue-400 underline"
                        onClick={() => handleRecentSearchClick(search)}
                      >
                        {search}
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="text-gray-400">No recent searches.</p>
                )}
                <button
                  onClick={clearRecentSearches}
                  className="mt-2 text-sm text-red-500 underline"
                >
                  Clear Recent Searches
                </button>
              </div>
            )}
          </div>
        </div>
      ) : null}
    </dialog>
  );
}
