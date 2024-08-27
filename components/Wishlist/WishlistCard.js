import Image from "next/image";
import Link from "next/link";
import { Button } from "../UI/button";
import { useDispatch, useSelector } from "react-redux";
import { useToast } from "../UI/use-toast";
import { ToastAction } from "../UI/toast";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/router";
import { addItemToCart, toggleWishlistItems } from "@/store/async-thunk";

export default function WishlistCard(props) {
  const { id, title, imageUrl, author, price } = props;
  const { user } = useAuth();
  const { toast } = useToast();
  const dispatch = useDispatch();
  const router = useRouter();
  const { wishlistItem } = useSelector((state) => state.wishlist);

  const handleAddToCart = () => {
    if (user) {
      dispatch(
        addItemToCart({
          userId: user?._id,
          productId: id,
          quantity: 1,
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

    const isInWishlist = wishlistItem.some((book) => book._id === id);

    dispatch(
      toggleWishlistItems({
        userId: user?._id,
        bookId: id,
        type: isInWishlist ? "REMOVE" : "ADD",
      })
    );
  };

  return (
    <div className="p-4 flex flex-row space-x-2 w-full mb-4 border-b border-gray-700">
      <div className=" flex-none">
        <Image src={imageUrl} alt="Image" width={67} height={100} />
      </div>
      <div className="w-full flex flex-row items-center justify-between">
        <div className="flex flex-col">
          <Link
            href={`/books/${id}`}
            className="font-serif text-gray-900 dark:text-yellow-50 underline-offset-4 text-lg underline hover:no-underline decoration-gray-300 dark:decoration-gray-500"
          >
            {title}
          </Link>
          <span>By {author}</span>
          <span className="font-medium">₹ {price}</span>
        </div>
        <div className="p-2 flex flex-col space-y-1.5">
          <Button onClick={handleAddToCart}>Add to cart</Button>
          <Button onClick={handleToggleWishlist}>Remove from Wishlist</Button>
        </div>
      </div>
    </div>
  );
}
