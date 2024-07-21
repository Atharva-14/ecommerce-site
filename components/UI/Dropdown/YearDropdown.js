const { useEffect, useState } = require("react");
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/UI/dropdown-menu";

const YearDropdown = ({ orders, onFilterSelect }) => {
  const [years, setYears] = useState([]);
  const [selectedFilter, setSelectedFilter] = useState("Past 3 months");

  useEffect(() => {
    const orderYears = orders.map((order) =>
      new Date(order.orderDate).getFullYear()
    );
    const uniqueYears = [...new Set(orderYears)].sort((a, b) => b - a);

    setYears(uniqueYears);
  }, [orders]);

  const handlerFilterChange = (label, value) => {
    setSelectedFilter(label);
    onFilterSelect(value);
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="bg-white py-0.5 px-4 rounded font-medium">
        {selectedFilter}
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuItem
        className='font-medium'
          onSelect={() => handlerFilterChange("Today", "today")}
        >
          Today
        </DropdownMenuItem>
        <DropdownMenuItem
        className='font-medium'
          onSelect={() => handlerFilterChange("Last 30 days", "last30days")}
        >
          Last 30 days
        </DropdownMenuItem>
        <DropdownMenuItem
        className='font-medium'
          onSelect={() => handlerFilterChange("Past 3 months", "past3months")}
        >
          Past 3 months
        </DropdownMenuItem>
        {years.map((year, index) => (
          <DropdownMenuItem
          className='font-medium'
            onSelect={() => handlerFilterChange(year, year.toString())}
            key={index}
          >
            {year}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default YearDropdown;
