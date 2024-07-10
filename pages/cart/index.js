import CartItem from "@/components/Cart/CartItem";
import privateRoute from "@/components/PrivateRoute/privateRoute";
import SkeletonCard from "@/components/UI/Skeleton/SkeletonCard";
import { Button } from "@/components/UI/button";
import { Separator } from "@/components/UI/separator";
import { useAuth } from "@/context/AuthContext";
import axios from "axios";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

const Cart = () => {
  const router = useRouter();
  const { logoutUser, user } = useAuth();
  const [loading, setLoading] = useState(false);
  const [cartItems, setCartItems] = useState([]);
  const [cartQuantity, setCartQuantity] = useState(0);
  const [totalCartValue, setTotalCartValue] = useState(0);

  const getCartitems = async (userId) => {
    setLoading(true);

    try {
      const res = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/cart/${userId}`
      );

      const response = res.data;
      // if (!response.success) {
      //   logoutUser();
      //   router.push("/login");
      // }
      const totalQuantity = response.cartItems.reduce(
        (total, book) => total + book.quantity,
        0
      );

      const totalPrice = response.cartItems.reduce(
        (total, book) => total + book.price * book.quantity,
        0
      );

      setCartItems(response.cartItems);
      setCartQuantity(totalQuantity);
      setTotalCartValue(totalPrice);
    } catch (error) {
      console.log("Failed to fecth cart: ", error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    console.log(user);
    if (user?._id) {
      console.log("inside: effect: ");
      getCartitems(user._id);
    }
  }, [user]);

  const addItem = (bookId = null) => {
    if (!bookId) return;

    const updatedItem = cartItems.map((item) => {
      const bookItem = { ...item };

      if (bookItem._id === bookId) {
        bookItem.quantity++;
      }
      return bookItem;
    });

    setCartItems(updatedItem);
  };

  const addItemToCart = async (id, price, userId) => {
    addItem(id);
    setCartQuantity(cartQuantity + 1);
    setTotalCartValue(totalCartValue + price);

    try {
      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/cart/add`,
        {
          userId,
          productId: id,
          quantity: 1,
        }
      );
    } catch (error) {
      console.log("Add to cart err: ", error.message);
    }
  };

  const removeItem = (bookId = null) => {
    if (!bookId) return;

    const updatedItem = cartItems
      .map((item) => {
        const bookItem = { ...item };

        if (bookItem._id === bookId) {
          bookItem.quantity = bookItem.quantity > 1 ? bookItem.quantity - 1 : 0;
        }
        return bookItem;
      })
      .filter((i) => i.quantity > 0);

    setCartItems(updatedItem);
  };

  const removeItemFromCart = async (id, price, userId) => {
    removeItem(id);
    setCartQuantity(cartQuantity - 1);
    setTotalCartValue(totalCartValue - price);

    try {
      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/cart/remove`,
        {
          userId,
          productId: id,
        }
      );
    } catch (error) {
      console.log("Remove from cart err: ", error.message);
    }
  };

  return (
    <div className="px-4 py-6 w-full flex space-x-3 bg-gradient-to-t from-slate-50 via-zinc-200 to-slate-300">
      <div className="w-3/4 bg-white p-5">
        <p className="text-2xl font-medium">Shopping Cart</p>
        <p className="pr-8 text-end">Price</p>

        <Separator />

        {loading && (
          <div className="py-2">
            <SkeletonCard />
            <SkeletonCard />
          </div>
        )}

        {cartQuantity ? (
          cartItems.map((book) => {
            if (book.quantity <= 0) return null;

            return (
              <CartItem
                key={book._id}
                addToCart={addItemToCart}
                removeFromCart={removeItemFromCart}
                {...book}
              />
            );
          })
        ) : (
          <p className=" text-xl text-center my-5">Your Cart is empty</p>
        )}
        <Separator />
        {cartQuantity ? (
          <p className="pr-8 pt-2 text-end text-lg">
            SubTotal ({cartQuantity} item): <b>₹{totalCartValue.toFixed(2)}</b>
          </p>
        ) : (
          ""
        )}
      </div>
      <div className="w-1/4">
        <div className="flex flex-col space-y-6 bg-white mx-3 p-6">
          <p className="text-center text-lg">
            SubTotal ({cartQuantity} item): <b>₹{totalCartValue.toFixed(2)}</b>
          </p>

          {cartQuantity ? (
            <Button
              className="mx-auto my-auto"
              onClick={() => router.push("/checkout")}
            >
              Proceed to Buy
            </Button>
          ) : (
            ""
          )}
        </div>
      </div>
    </div>
  );
};

export default privateRoute(Cart);
