import BookCard from "@/components/Book/BookCard";
import { useAuth } from "@/context/AuthContext";
import { getWishlistItems } from "@/store/async-thunk";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

const Wishlist = () => {
  const { user } = useAuth();
  const dispatch = useDispatch();

  const wishlist = useSelector((state) => state.wishlist.wishlistItem);

  useEffect(() => {
    if (user) {
      dispatch(getWishlistItems(user?._id));
    }
  }, [user]);

  console.log("Inside wishlist", wishlist);

  return (
    <>
      <div className="flex flex-wrap w-11/12 py-4">
        {wishlist.map((book) => (
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
    </>
  );
};

export default Wishlist;
