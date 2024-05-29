import CartItem from "@/components/Cart/CartItem";
import privateRoute from "@/components/PrivateRoute/privateRoute";
import axios from "axios";
import { useEffect, useState } from "react";

const Cart = () => {
  const [cartValue, setCartValue] = useState(0);
  const [discountAmt, setDiscountAmt] = useState(0);
  const [cartItems, setCartItems] = useState([]);
  const [cartQuantity, setCartQuantity] = useState([]);
  const [totalCartValue, setTotalCartValue] = useState(0);

  const getCartitems = async (userId) => {
    try {
      const res = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/cart/${userId}`
      );

      const response = res.data;
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
    }
  };

  useEffect(() => {
    const user = JSON.parse(sessionStorage.getItem("user"));
    const userId = user._id;
    getCartitems(userId);
  }, []);

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

  const handleCoupons = (event) => {
    const coupon = event.target.value;

    if (coupon === "SAVE20") {
      setCartValue(totalCartValue - (totalCartValue * 20) / 100);
      setDiscountAmt(
        totalCartValue - (totalCartValue - (totalCartValue * 20) / 100)
      );
    } else if (coupon === "MEGA40") {
      setCartValue(totalCartValue - (totalCartValue * 40) / 100);
      setDiscountAmt(
        totalCartValue - (totalCartValue - (totalCartValue * 40) / 100)
      );
    } else if (coupon === "MEGA10") {
      setCartValue(totalCartValue - (totalCartValue * 10) / 100);
      setDiscountAmt(
        totalCartValue - (totalCartValue - (totalCartValue * 10) / 100)
      );
    } else if (coupon === "CLEAR") {
      setCartValue(totalCartValue);
      setDiscountAmt(0);
    }
  };

  // console.log(JSON.stringify(cartItems));
  return (
    <div className="p-4 w-full flex space-x-3 bg-gray-200">
      <div className="w-3/4 bg-white p-5">
        <p className="text-2xl font-medium">Shopping Cart</p>
        <p className="pr-8 text-end">Price</p>

        <hr />

        {cartQuantity ? (
          cartItems.map((book) => {
            console.log(book.quantity, book.title);
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
        <hr />
        {cartQuantity ? (
          <p className="pr-8 pt-2 text-end text-lg">
            SubTotal ({cartQuantity} item): <b>₹{totalCartValue.toFixed(2)}</b>
          </p>
        ) : (
          ""
        )}
      </div>
      <div className="w-1/4 h-full flex flex-col space-y-5">
        <div className="flex flex-col space-y-1 bg-white p-2.5">
          <p className="text-center text-lg">
            SubTotal ({cartQuantity} item): <b>₹{totalCartValue.toFixed(2)}</b>
          </p>
          <p className="text-center ">
            Applied Discount: {discountAmt.toFixed(2)}
          </p>

          {cartQuantity ? (
            <button className="border rounded-lg shadow border-gray-300 mx-auto p-1.5 hover:bg-gray-300 ">
              Proceed to Buy
            </button>
          ) : (
            ""
          )}
        </div>

        {/* Coupons */}
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
};

export default privateRoute(Cart);
