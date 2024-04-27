import CartItem from "@/components/Cart/CartItem";
import { DUMMY_BOOKS_DATA } from "@/utils/data";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

export default function Cart() {
  const [cartValue, setCartValue] = useState(0);
  const cartItems = useSelector((state) => state.cart.books);
  const cartQuantity = useSelector((state) => state.cart.totalQuantity);
  const totalCartValue = useSelector((state) => state.cart.totalCartValue);

  useEffect(() => {
    setCartValue(totalCartValue);
  }, [totalCartValue]);

  function handleCoupons(event) {
    const coupon = event.target.value;

    if (coupon === "SAVE20") {
      setCartValue(totalCartValue - (totalCartValue * 20) / 100);
    } else if (coupon === "MEGA40") {
      setCartValue(totalCartValue - (totalCartValue * 40) / 100);
    } else if (coupon === "MEGA10") {
      setCartValue(totalCartValue - (totalCartValue * 10) / 100);
    } else if (coupon === "CLEAR") {
      setCartValue(totalCartValue);
    }
  }

  return (
    <div className="p-4 w-full flex space-x-3 bg-gray-200">
      <div className="w-3/4 bg-white p-5">
        <p className="text-2xl font-medium">Shopping Cart</p>
        <p className="pr-8 text-end">Price</p>
        <hr />
        {cartQuantity ? (
          cartItems.map((book) => (
            <CartItem
              key={book.id}
              id={book.id}
              title={book.title}
              imageUrl={book.imageUrl}
              author={book.author}
              price={book.price}
              total={book.totalPrice}
              quantity={book.quantity}
            />
          ))
        ) : (
          <p className=" text-xl text-center my-5">Your Cart is empty</p>
        )}
        <hr />
        {cartQuantity ? (
          <p className="pr-8 pt-2 text-end text-lg">
            SubTotal ({cartQuantity} item): <b>₹{totalCartValue.toFixed(2)}</b>
          </p>
        ) : (
          ""
        )}
      </div>
      <div className="w-1/4 h-ful flex flex-col space-y-5">
        <div className="flex flex-col space-y-4 bg-white p-2.5">
          <p className="text-center text-lg">
            SubTotal ({cartQuantity} item): <b>₹{cartValue.toFixed(2)}</b>
          </p>
          {cartQuantity ? (
            <button className="border rounded-lg shadow border-gray-300 mx-auto p-1.5 hover:bg-gray-300 ">
              Proceed to Buy
            </button>
          ) : (
            ""
          )}
        </div>
        <div className="flex flex-col items-center space-y-4 bg-white p-2.5">
          <label className="text-center text-lg">Apply Coupon</label>
          <div className="">
            <button
              className="font-bold p-2 rounded focus:bg-green-500 focus:outline-none  focus:ring-green-500 border-2"
              onClick={handleCoupons}
              value="SAVE20"
            >
              SAVE20
            </button>
            <button
              className="font-bold p-2 rounded focus:bg-green-500 focus:outline-none  focus:ring-green-500 border-2"
              onClick={handleCoupons}
              value="MEGA10"
            >
              MEGA10
            </button>
            <button
              className="font-bold p-2 rounded focus:bg-green-500 focus:outline-none  focus:ring-green-500 border-2"
              onClick={handleCoupons}
              value="MEGA40"
            >
              MEGA40
            </button>
            <button
              className="outline-none rounded p-2 border-2"
              onClick={handleCoupons}
              value="CLEAR"
            >
              CLEAR
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
