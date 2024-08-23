import privateRoute from "@/components/PrivateRoute/privateRoute";
import { useAuth } from "@/context/AuthContext";
import axios from "axios";
import { useEffect, useState } from "react";
import { format } from "date-fns";
import YearDropdown from "@/components/UI/Dropdown/YearDropdown";
import Link from "next/link";
import SkeletonOrder from "@/components/UI/Skeleton/SkeletonOrder";
import Head from "next/head";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/UI/pagination";

const Orders = () => {
  const { user } = useAuth();
  const [pastOrders, setPastOrders] = useState([]);
  const [loading, setLoading] = useState(false);
  const [filteredOrders, setFilteredOrders] = useState([]);
  const [selectedFilter, setSelectedFilter] = useState("past3months");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const getPastOrders = async (userId) => {
    setLoading(true);
    try {
      const res = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/orders/${userId}`
      );
      const response = res.data;

      const sortedOrders = response.pastOrdersDetails.sort(
        (a, b) => new Date(b.orderDate) - new Date(a.orderDate)
      );

      setPastOrders(sortedOrders);
    } catch (error) {
      console.log("Failed to fecth past orders: ", error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (user?._id) {
      console.log("inside useEffect");
      getPastOrders(user?._id);
    }
  }, [user]);

  useEffect(() => {
    if (pastOrders.length > 0) {
      const now = new Date();

      let filteredData;

      switch (selectedFilter) {
        case "today":
          filteredData = pastOrders.filter((order) => {
            const orderDate = new Date(order.orderDate);
            return (
              orderDate.getDate() === now.getDate() &&
              orderDate.getMonth() === now.getMonth() &&
              orderDate.getFullYear() === now.getFullYear()
            );
          });
          break;
        case "last30days":
          filteredData = pastOrders.filter((order) => {
            const orderDate = new Date(order.orderDate);
            const thirtyDaysAgo = new Date(now.setDate(now.getDate() - 30));
            return orderDate >= thirtyDaysAgo;
          });
          break;

        case "past3months":
          filteredData = pastOrders.filter((order) => {
            const orderDate = new Date(order.orderDate);
            const threeMonthsAgo = new Date(now.setMonth(now.getMonth() - 3));
            return orderDate >= threeMonthsAgo;
          });
          break;

        default:
          filteredData = pastOrders.filter((order) => {
            const orderDate = new Date(order.orderDate);
            return orderDate.getFullYear().toString() === selectedFilter;
          });
          break;
      }
      setFilteredOrders(filteredData);
    }
  }, [selectedFilter, pastOrders]);

  const formatDate = (date) => {
    return format(new Date(date), "MMMM dd, yyyy");
  };

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredOrders.slice(indexOfFirstItem, indexOfLastItem);

  const totalPages = Math.ceil(filteredOrders.length / itemsPerPage);

  return (
    <div className="sm:w-2/3 w-full mx-auto p-6 flex flex-col space-y-4">
      <Head>
        <title>Your Orders - eBookHeaven</title>
        <meta
          name="description"
          content="View and manage your past orders on eBookHeaven."
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <span>
        <h1 className="font-semibold text-2xl">Your Orders</h1>
      </span>
      <div className="flex justify-between">
        <div className="p-1 bg-gray-200 rounded-md cursor-pointer">
          <p className="bg-white py-0.5 px-12 rounded font-medium">
            Orders ({filteredOrders.length})
          </p>
        </div>
        <div className="p-1 bg-gray-200 rounded-md cursor-pointer">
          <YearDropdown
            orders={pastOrders}
            onFilterSelect={setSelectedFilter}
          />
        </div>
      </div>

      {loading && (
        <div className="py-2">
          <SkeletonOrder />
        </div>
      )}

      {currentItems ? (
        currentItems.map((order) => (
          <div className="border border-gray-300 rounded-lg" key={order.id}>
            <div className="flex md:flex-row flex-col space-y-4 md:space-y-0 md:space-x-4 justify-between px-4 py-3.5 bg-gray-200 border-b border-gray-300">
              <span className="w-1/2">
                <p className="text-gray-500 font-medium text-sm">
                  Order Placed
                </p>
                <p className="font-medium">{formatDate(order.orderDate)}</p>
              </span>
              <span className="w-1/2">
                <p className="text-gray-500 font-medium text-sm">Total</p>
                <p className="font-medium">₹ {order.totalAmount.toFixed(2)}</p>
              </span>
              <span className="w-1/2">
                <p className="text-gray-500 font-medium text-sm">Ship To</p>
                <p className="font-medium">{order.address.fullName}</p>
              </span>
              <span className="w-1/2">
                <p className="font-medium text-sm">Order ID</p>
                <p className="font-medium">#{order.id}</p>
              </span>
            </div>
            <div className="px-4 py-3.5 flex flex-col">
              <p className="font-medium text-xl">
                Delivered{" "}
                {new Date(order.orderDate).toLocaleDateString("en-US", {
                  month: "long",
                  day: "2-digit",
                })}
              </p>
              <div className="flex flex-wrap py-4">
                {order.item &&
                  order.item.map((book) => (
                    <div
                      className="w-full sm:w-1/2 lg:w-1/3 px-3 py-4 h-36 flex space-x-4 "
                      key={book._id}
                    >
                      <img
                        src={book.imageUrl}
                        alt={book.title}
                        className="w-16"
                      />
                      <span className="flex flex-col justify-center w-full">
                        <Link
                          href={`/books/${book._id}`}
                          className="text-xl font-semibold hover:underline hover:text-orange-400"
                        >
                          {book.title}
                        </Link>
                        <p className="text-sm text-gray-500 font-medium">
                          By {book.author}
                        </p>
                        <p className="font-medium">Qty: {book.quantity}</p>
                      </span>
                    </div>
                  ))}
              </div>
            </div>
          </div>
        ))
      ) : (
        <p>No past orders</p>
      )}

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
  );
};

export default privateRoute(Orders);
