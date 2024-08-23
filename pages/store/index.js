import BookCard from "@/components/Book/BookCard";
import { Button } from "@/components/UI/button";
import PriceDropdown from "@/components/UI/Dropdown/PriceDropdown";
import { Label } from "@/components/UI/label";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/UI/pagination";
import { getAllBooks, getAllCategory } from "@/lib/services/bookService";
import Head from "next/head";
import { useEffect, useState } from "react";

export default function Store({ allBooksData, allCategoryData }) {
  const [filteredResults, setFilteredResults] = useState(allBooksData);
  const [selectedValue, setSelectedValue] = useState("Featured");
  const [isCategoryVisible, setIsCategoryVisible] = useState(false);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [selectedPriceRange, setSelectedPriceRange] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 15;

  const handleCategoryChange = (category) => {
    setSelectedCategories((prevSelectedCategories) => {
      if (prevSelectedCategories.includes(category)) {
        return prevSelectedCategories.filter((cat) => cat !== category);
      } else {
        return [...prevSelectedCategories, category];
      }
    });
  };

  const handlePriceChange = (priceRange) => {
    setSelectedPriceRange(priceRange);
  };

  const filterBooksByCategoryAndPrice = () => {
    let filteredBooks = allBooksData;

    if (selectedCategories.length > 0) {
      filteredBooks = filteredBooks.filter((book) =>
        selectedCategories.includes(book.category)
      );
    }

    if (selectedPriceRange === "twoToFiveHundred") {
      filteredBooks = filteredBooks.filter(
        (book) => book.price >= 200 && book.price <= 500
      );
    } else if (selectedPriceRange === "overFiveHundred") {
      filteredBooks = filteredBooks.filter((book) => book.price > 500);
    }

    setFilteredResults(filteredBooks);
  };

  const handleFilter = () => {
    setIsCategoryVisible((prevState) => !prevState);
  };

  const handleOptionClick = (value) => {
    if (value === "featured") {
      setSelectedValue("Featured");
      setFilteredResults(allBooksData);
    } else if (value === "lowToHigh") {
      setSelectedValue("Low to High");
      setFilteredResults(allBooksData.sort((a, b) => a.price - b.price));
    } else if (value === "highToLow") {
      setSelectedValue("High to Low");
      setFilteredResults(allBooksData.sort((a, b) => b.price - a.price));
    }
  };

  useEffect(() => {
    setCurrentPage(1);
    filterBooksByCategoryAndPrice();
  }, [selectedCategories, selectedPriceRange]);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredResults.slice(indexOfFirstItem, indexOfLastItem);

  const totalPages = Math.ceil(filteredResults.length / itemsPerPage);

  return (
    <div className="min-h-screen flex flex-col bg-gray-200">
      <Head>
        <title>Online Bookstore - Browse Books by Category and Price</title>
        <meta
          name="description"
          content="Explore a wide range of books categorized by genre and price range. Find your next favorite read today!"
        />
        <meta
          property="og:title"
          content="Online Bookstore - Browse Books by Category and Price"
        />
        <meta
          property="og:description"
          content="Explore a wide range of books categorized by genre and price range. Find your next favorite read today!"
        />
        <meta
          property="og:image"
          content="https://cdn.dribbble.com/userupload/13706589/file/original-d56d9b12b2ba34ed5bbe400cbb4c5fa9.png?resize=752x"
        />
      </Head>
      <div className="bg-[url('https://cdn.dribbble.com/userupload/15281281/file/original-ef6bd155938cd5f4cf018c74b0e12fa3.jpg?resize=1024x768')] bg-auto bg-center h-[300px] "></div>
      <div className="flex flex-col">
        <div className="mt-4 p-4 mx-auto">
          <div className="flex space-x-80 mx-auto">
            <div className="flex space-x-2">
              <Button className="space-x-2 text-lg" onClick={handleFilter}>
                <i className="bx bx-filter-alt"></i>
                <p>FILTER</p>
              </Button>
              <Button
                className="text-lg"
                onClick={() => {
                  setSelectedCategories([]);
                  setSelectedPriceRange("");
                  setIsCategoryVisible(false);
                }}
              >
                CLEAR
              </Button>
            </div>
            <PriceDropdown onChange={handleOptionClick} />
          </div>

          {isCategoryVisible && (
            <div className="mt-6 p-2.5 flex">
              <div className="mt-6 p-2.5">
                <h3 className="font-semibold">CATEGORIES</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 py-3">
                  {allCategoryData.map((category, index) => (
                    <div className="flex items-center space-x-1" key={index}>
                      <input
                        type="checkbox"
                        value={category}
                        checked={selectedCategories.includes(category)}
                        onChange={() => handleCategoryChange(category)}
                      />
                      <Label className="text-base font-normal">
                        {category}
                      </Label>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mt-6 p-2.5">
                <h3 className="font-semibold">PRICE</h3>
                <div className="flex items-center space-x-1">
                  <input
                    type="radio"
                    value="twoToFiveHundred"
                    checked={selectedPriceRange === "twoToFiveHundred"}
                    onChange={() => handlePriceChange("twoToFiveHundred")}
                  />
                  <Label className="text-base font-normal">₹200 - ₹500</Label>
                </div>
                <div className="flex items-center space-x-1">
                  <input
                    type="radio"
                    value="overFiveHundred"
                    checked={selectedPriceRange === "overFiveHundred"}
                    onChange={() => handlePriceChange("overFiveHundred")}
                  />
                  <Label className="text-base font-normal">Over ₹500</Label>
                </div>
              </div>
            </div>
          )}
        </div>
        <div className="flex mx-auto flex-wrap w-11/12 py-4">
          {currentItems.map((book) => (
            <div key={book._id} className="w-full sm:w-1/2 lg:w-1/3 p-3">
              <BookCard
                id={book._id}
                title={book.title}
                imageUrl={book.imageUrl}
                author={book.author}
                price={book.price}
              />
            </div>
          ))}
        </div>

        <Pagination className="mb-4">
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious
                onClick={() => setCurrentPage(currentPage - 1)}
                disabled={currentPage === 1}
              />
            </PaginationItem>
            {Array.from({ length: totalPages }, (_, index) => (
              <PaginationItem key={index}>
                <PaginationLink
                  isActive={currentPage === index + 1}
                  onClick={() => setCurrentPage(index + 1)}
                  disabled={false} // Links should not be disabled in this context
                >
                  {index + 1}
                </PaginationLink>
              </PaginationItem>
            ))}
            <PaginationItem>
              <PaginationNext
                onClick={() => setCurrentPage(currentPage + 1)}
                disabled={currentPage === totalPages}
              />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      </div>
    </div>
  );
}

export async function getStaticProps() {
  let allBooksData = await getAllBooks();
  const allCategoryData = await getAllCategory();

  return {
    props: {
      allBooksData: JSON.parse(JSON.stringify(allBooksData)),
      allCategoryData,
    },
  };
}
