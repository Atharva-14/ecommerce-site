import React, { useState, useEffect } from "react";

// Sample data (usually fetched from an API)
const sampleData = [
  { id: 1, name: "Item 1" },
  { id: 2, name: "Item 2" },
  { id: 3, name: "Item 3" },
  { id: 4, name: "Item 4" },
  { id: 5, name: "Item 5" },
  { id: 6, name: "Item 6" },
  { id: 7, name: "Item 7" },
  { id: 8, name: "Item 8" },
  { id: 9, name: "Item 9" },
  { id: 10, name: "Item 10" },
  { id: 11, name: "Item 11" },
  { id: 12, name: "Item 12" },
  { id: 13, name: "Item 13" },
  { id: 14, name: "Item 14" },
  { id: 15, name: "Item 15" },
];

const PaginationComponent = ({ itemsPerPage }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [currentItems, setCurrentItems] = useState([]);

  // Calculate the total number of pages
  const totalPages = Math.ceil(sampleData.length / itemsPerPage);

  // Calculate the indices of the first and last items on the current page
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;

  // Update the current items when the current page or itemsPerPage changes
  useEffect(() => {
    console.log(startIndex, endIndex);
    setCurrentItems(sampleData.slice(startIndex, endIndex));
  }, [sampleData, startIndex, endIndex]);

  // Handle page change
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <div>
      <ul>
        {currentItems.map((item) => (
          <li key={item.id}>{item.name}</li>
        ))}
      </ul>

      {/* Pagination controls */}
      <div>
        {Array.from({ length: totalPages }, (_, index) => (
          <button
            key={index + 1}
            onClick={() => handlePageChange(index + 1)}
            disabled={currentPage === index + 1}
          >
            {index + 1}
          </button>
        ))}
      </div>
    </div>
  );
};

const Wishlist = () => {
  return (
    <>
      <h1>Pagination Example</h1>
      <PaginationComponent itemsPerPage={5} />
    </>
  );
};

export default Wishlist;
