import privateRoute from "@/components/PrivateRoute/privateRoute";
import SkeletonWishlist from "@/components/UI/Skeleton/SkeletonWishlist";
import WishlistCard from "@/components/Wishlist/WishlistCard";
import { useAuth } from "@/context/AuthContext";
import { getWishlistItems } from "@/store/async-thunk";
import Head from "next/head";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

const Wishlist = () => {
  const { user } = useAuth();
  const dispatch = useDispatch();

  const wishlist = useSelector((state) => state.wishlist.wishlistItem);
  const loading = useSelector((state) => state.wishlist.loading);

  useEffect(() => {
    if (user) {
      dispatch(getWishlistItems(user?._id));
    }
  }, [user]);

  console.log("Inside wishlist", wishlist);

  return (
    <div className="flex flex-col mx-auto w-7/12 py-4">
      <Head>
        <title>{user ? `${user.firstName}'s Wishlist` : "Wishlist"}</title>
        <meta
          name="description"
          content="View and manage your wishlist items."
        />
        <meta name="robots" content="noindex, nofollow" />
      </Head>
      <h1 className="font-semibold text-4xl mb-2">
        {user.firstName}'s Wishlist
      </h1>
      {loading && (
        <div>
          <SkeletonWishlist />
          <SkeletonWishlist />
          <SkeletonWishlist />
        </div>
      )}
      <div>
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
    </div>
  );
};

export default privateRoute(Wishlist);
