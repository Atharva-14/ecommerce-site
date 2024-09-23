import privateRoute from "@/components/PrivateRoute/privateRoute";
import SkeletonWishlist from "@/components/UI/Skeleton/SkeletonWishlist";
import WishlistCard from "@/components/Wishlist/WishlistCard";
import { useAuth } from "@/context/AuthContext";
import { getWishlistItems } from "@/store/async-thunk";
import Head from "next/head";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/UI/pagination";
import PriceDropdown from "@/components/UI/Dropdown/PriceDropdown";
import wishlistImage from "@/public/undraw_wishlist.svg";
import Image from "next/image";

const Wishlist = () => {
  const { user } = useAuth();
  const dispatch = useDispatch();
  const [currentPage, setCurrentPage] = useState(1);
  const [filteredWishlist, setFilteredWishlist] = useState([]);
  const itemsPerPage = 15;

  const wishlist = useSelector((state) => state.wishlist.wishlistItem);
  const loading = useSelector((state) => state.wishlist.loading);

  useEffect(() => {
    if (user) {
      dispatch(getWishlistItems(user?._id));
    }
  }, [user]);

  useEffect(() => {
    setFilteredWishlist(wishlist);
  }, [wishlist]);

  const handleOptionClick = (value) => {
    let sortedWishlist;

    switch (value) {
      case "lowToHigh":
        sortedWishlist = [...wishlist].sort((a, b) => a.price - b.price);
        setFilteredWishlist(sortedWishlist);
        break;

      case "highToLow":
        sortedWishlist = [...wishlist].sort((a, b) => b.price - a.price);
        setFilteredWishlist(sortedWishlist);
        break;

      default:
        setFilteredWishlist(wishlist);
    }
    setCurrentPage(1);
  };

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredWishlist.slice(indexOfFirstItem, indexOfLastItem);

  const totalPages = Math.ceil(filteredWishlist.length / itemsPerPage);

  return (
    <div className="flex flex-col mx-auto w-7/12 py-4">
      <Head>
        <title>{user ? `${user?.firstName}'s Wishlist` : "Wishlist"}</title>
        <meta name="description" content="View and manage your wishlist items." />
        <meta name="robots" content="noindex, nofollow" />
      </Head>
      <h1 className="font-semibold text-4xl mb-2">
        {user?.firstName}'s Wishlist
      </h1>

      {/* Show loading skeleton while loading */}
      {loading ? (
        <div>
          <SkeletonWishlist />
          <SkeletonWishlist />
          <SkeletonWishlist />
        </div>
      ) : (
        <>
          {/* Show wishlist items if available */}
          {currentItems.length >= 1 ? (
            <div>
              <div>
                <PriceDropdown onChange={handleOptionClick} />
              </div>
              <div>
                {currentItems.map((book) => (
                  <div key={book._id} className="w-full">
                    <WishlistCard
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
          ) : (
            // Show this message only if no wishlist items are present and loading has finished
            <div className="flex flex-col justify-center items-center mx-auto space-y-4 py-8">
              <Image src={wishlistImage} alt="Wishlist" width={500} />
              <h1 className="text-2xl font-medium">
                Please add your favourite book's
              </h1>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default privateRoute(Wishlist);
