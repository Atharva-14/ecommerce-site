import CartItem from "@/components/Cart/CartItem";
import privateRoute from "@/components/PrivateRoute/privateRoute";
import SkeletonCard from "@/components/UI/Skeleton/SkeletonCard";
import { Button } from "@/components/UI/button";
import { Separator } from "@/components/UI/separator";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import emptyCart from "@/public/undraw_empty_cart.svg";
import Image from "next/image";
import { useDispatch, useSelector } from "react-redux";
import { getCartItems } from "@/store/async-thunk";

const Cart = () => {
  const router = useRouter();
  const { user } = useAuth();

  const dispatch = useDispatch();

  const cartItems = useSelector((state) => state.cart.bookCart);
  const totalCartValue = useSelector((state) => state.cart.totalCartValue);
  const cartQuantity = useSelector((state) => state.cart.totalQuantity);
  const loading = useSelector((state) => state.cart.loading);

  useEffect(() => {
    if (user?._id) {
      console.log("inside: effect: ");
      dispatch(getCartItems(user?._id));
    }
  }, []);

  console.log("cart Page", cartItems);

  // bg-gradient-to-t from-slate-50 via-zinc-200 to-slate-300

  return (
    <div className="px-4 py-6 w-full flex space-x-3">
      <div className="w-3/4 bg-white p-5 shadow-md rounded">
        <p className="text-2xl font-medium mb-1">Shopping Cart</p>
        {cartQuantity ? <p className="pr-8 text-end">Price</p> : null}

        <Separator />

        {loading && !cartItems.length ? (
          <div className="py-2">
            <SkeletonCard />
            <SkeletonCard />
          </div>
        ) : cartQuantity ? (
          cartItems.map((book) => {
            if (book.quantity <= 0) return null;

            return <CartItem key={book._id} {...book} />;
          })
        ) : (
          <div className="flex flex-col justify-between py-4">
            <Image src={emptyCart} width={300} className="mx-auto" />
            <p className="text-xl text-center mt-5">Your Cart is empty.</p>
          </div>
        )}
        <Separator />

        {cartQuantity ? (
          <p className="pr-8 pt-2 text-end text-lg ">
            SubTotal ({cartQuantity} item): <b>₹{totalCartValue.toFixed(2)}</b>
          </p>
        ) : (
          ""
        )}
      </div>
      <div className="w-1/4">
        <div className="flex flex-col space-y-6 bg-white mx-3 p-6 shadow-md rounded">
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
