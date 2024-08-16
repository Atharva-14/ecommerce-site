import privateRoute from "@/components/PrivateRoute/privateRoute";
import WishlistCard from "@/components/Wishlist/WishlistCard";
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
      <div className="flex flex-col mx-auto w-7/12 py-4">
        {wishlist.map((book) => (
          <div key={book._id} className="w-full ">
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
    </>
  );
};

export default privateRoute(Wishlist);
