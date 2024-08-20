import { useState } from "react";

export default function PriceDropdown({ onChange }) {
  const [filter, setFilter] = useState("Featured");

  const handleFilterChange = (e) => {
    const selectedFilter = e.target.value;
    setFilter(selectedFilter);
    onChange(selectedFilter);
  };

  return (
    <div className="w-fit">
      <select
        value={filter}
        onChange={handleFilterChange}
        className="border-2 border-black py-2 px-3.5 focus:outline-none"
      >
        <option value="featured">Featured</option>
        <option value="lowToHigh">Price, Low to High</option>
        <option value="highToLow">Price, High to Low</option>
      </select>
    </div>
  );
}
