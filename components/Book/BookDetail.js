import { useEffect, useState } from "react";
import QuantityDropdown from "../UI/QuantityDropdown";
import { useAuth } from "@/context/AuthContext";
import { Separator } from "../UI/separator";
import { useToast } from "../UI/use-toast";
import { useRouter } from "next/router";
import { ToastAction } from "../UI/toast";
import { useDispatch, useSelector } from "react-redux";
import {
  addItemToCart,
  getWishlistItems,
  toggleWishlistItems,
} from "@/store/async-thunk";

export default function BookDetail({ props }) {
  const { user } = useAuth();
  const { toast } = useToast();
  const router = useRouter();
  const [selectedQuantity, setSelectedQuantity] = useState(1);
  const { _id, title, imageUrl, author, price, description, bestselling } =
    props;

  const dispatch = useDispatch();

  const { wishlistItem, loading, error } = useSelector(
    (state) => state.wishlist
  );

  useEffect(() => {
    if (user) {
      dispatch(getWishlistItems(user?._id));
    }
  }, [user]);

  const handleAddToCart = () => {
    if (user) {
      dispatch(
        addItemToCart({
          userId: user?._id,
          productId: _id,
          quantity: selectedQuantity,
        })
      );
      toast({ variant: "constructive", title: "Added to cart" });
    } else {
      toast({
        variant: "destructive",
        title: "Uh oh! Something went wrong. Please Sign In",
        action: (
          <ToastAction altText="Sign In" onClick={() => router.push("/login")}>
            Sign In
          </ToastAction>
        ),
      });
    }
  };

  const handleQuantityChange = (quantity) => {
    setSelectedQuantity(quantity);
  };

  const handleToggleWishlist = () => {
    if (!user) {
      toast({
        variant: "destructive",
        title: "Uh oh! Something went wrong. Please Sign In",
        action: (
          <ToastAction altText="Sign In" onClick={() => router.push("/login")}>
            Sign In
          </ToastAction>
        ),
      });
      return;
    }

    const isInWishlist = wishlistItem.some((book) => book._id === _id);

    dispatch(
      toggleWishlistItems({
        userId: user?._id,
        bookId: _id,
        type: isInWishlist ? "REMOVE" : "ADD",
      })
    );
  };

  return (
    <div className="flex flex-col md:flex-row justify-evenly md:space-x-10">
      <div className="w-full md:w-1/2 p-4 items-center m-auto relative">
        <img
          src={imageUrl}
          alt={title}
          className="border-white w-full md:w-2/4 rounded-3xl p-4 mx-auto"
        />
        {bestselling && (
          <div className="absolute top-4 left-4 bg-yellow-200 text-yellow-800 text-lg font-bold px-2 py-1 rounded">
            Best Selling #{bestselling}
          </div>
        )}
      </div>
      <div className="w-full md:w-1/2 flex flex-col space-y-6 m-auto p-2.5">
        <div className="space-y-2">
          <div className="space-y-2">
            <h1 className="font-bold text-3xl">{title}</h1>
            <p className="font-semibold">by {author}</p>
            <p className="font-bold text-xl">₹{price}</p>
          </div>

          <div className="space-y-2">
            <span className="max-w-fit">
              <p className="font-medium">About this Book</p>
              <Separator className="bg-gray-400 w-32" />
            </span>
            <p>{description}</p>
          </div>
        </div>

        <div className="flex flex-col">
          <p className="font-medium">Quantity:</p>
          <div className="flex flex-wrap md:space-x-5 py-2.5">
            <QuantityDropdown onChange={handleQuantityChange} />
            <button
              className="border-2 border-black hover:bg-gray-800 py-2 px-6 bg-black text-white font-medium"
              onClick={handleAddToCart}
            >
              ADD TO CART
            </button>
            {/* Flex container for wishlist and share buttons */}
            <div className="flex items-center space-x-4">
              <button
                className="flex items-center px-1"
                onClick={handleToggleWishlist}
              >
                {wishlistItem.some((book) => book._id === _id) ? (
                  <i className="bx bxs-heart text-3xl"></i>
                ) : (
                  <i className="bx bx-heart text-3xl"></i>
                )}
              </button>
              <button className="flex items-center">
                <i className="bx bx-share-alt text-3xl"></i>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
