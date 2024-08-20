import { Button } from "@/components/UI/button";
import { Input } from "@/components/UI/input";
import { Label } from "@/components/UI/label";
import OrderPlacedModal from "@/components/UI/Modal/OrderPlacedModal";
import privateRoute from "@/components/PrivateRoute/privateRoute";
import { RadioGroup, RadioGroupItem } from "@/components/UI/radio-group";
import { Separator } from "@/components/UI/separator";
import { useAuth } from "@/context/AuthContext";
import { cn } from "@/lib/utils";
import axios from "axios";
import { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import Head from "next/head";

const Checkout = () => {
  const { user } = useAuth();
  const [paymentMethod, setPaymentMethod] = useState("");
  const [discountAmt, setDiscountAmt] = useState(0);
  const [discountPercent, setDiscountPercent] = useState(0);
  const [cartValue, setCartValue] = useState(0);
  const [selectedAddress, setSelectedAddress] = useState(null);
  const [isModalOpen, setModalOpen] = useState(false);
  const total = useRef();
  const couponInput = useRef();
  const userId = user?._id;

  const cartItems = useSelector((state) => state.cart.bookCart);
  const totalCartValue = useSelector((state) => state.cart.totalCartValue);

  useEffect(() => {
    console.log(user);
    if (user?._id) {
      console.log("inside: effect: ", typeof user._id);
      console.log(cartItems);
      setCartValue(totalCartValue);
    }
    couponInput.current.value = "SAVE20";
  }, [user, cartItems]);

  const handleCoupon = () => {
    const coupon = couponInput.current.value;

    if (coupon === "SAVE20") {
      setCartValue(totalCartValue - (totalCartValue * 20) / 100);
      setDiscountAmt(
        totalCartValue - (totalCartValue - (totalCartValue * 20) / 100)
      );
      setDiscountPercent(20);
      couponInput.current.disabled = true;
      couponInput.current.className = cn(
        "flex h-10 rounded-md border border-green-700 text-green-700 bg-white px-3 py-2 text-sm ring-offset-white file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-slate-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-950 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 dark:border-slate-800 dark:bg-slate-950 dark:ring-offset-slate-950 dark:placeholder:text-slate-400 dark:focus-visible:ring-slate-300"
      );
    } else if (coupon === "MEGA40") {
      setCartValue(totalCartValue - (totalCartValue * 40) / 100);
      setDiscountAmt(
        totalCartValue - (totalCartValue - (totalCartValue * 40) / 100)
      );
      setDiscountPercent(40);
      couponInput.current.disabled = true;
      couponInput.current.className = cn(
        "flex h-10 rounded-md border border-green-700 text-green-700 bg-white px-3 py-2 text-sm ring-offset-white file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-slate-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-950 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 dark:border-slate-800 dark:bg-slate-950 dark:ring-offset-slate-950 dark:placeholder:text-slate-400 dark:focus-visible:ring-slate-300"
      );
    } else if (coupon === "MEGA10") {
      setCartValue(totalCartValue - (totalCartValue * 10) / 100);
      setDiscountAmt(
        totalCartValue - (totalCartValue - (totalCartValue * 10) / 100)
      );
      setDiscountPercent(10);
      couponInput.current.disabled = true;
      couponInput.current.className = cn(
        "flex h-10 rounded-md border border-green-700 text-green-700 bg-white px-3 py-2 text-sm ring-offset-white file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-slate-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-950 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 dark:border-slate-800 dark:bg-slate-950 dark:ring-offset-slate-950 dark:placeholder:text-slate-400 dark:focus-visible:ring-slate-300"
      );
    }
  };

  const clearCoupon = () => {
    setCartValue(totalCartValue);
    setDiscountAmt(0);
    setDiscountPercent(0);
    couponInput.current.value = "";
    couponInput.current.className = cn(
      "flex h-10 w-full rounded-md border bg-white border border-gray-400 border-slate-200 bg-white px-3 py-2 text-sm ring-offset-white file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-slate-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-950 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 dark:border-slate-800 dark:bg-slate-950 dark:ring-offset-slate-950 dark:placeholder:text-slate-400 dark:focus-visible:ring-slate-300"
    );
    couponInput.current.disabled = false;
  };

  const closeOrderCompleteModal = () => setModalOpen(false);

  console.log(cartItems);

  const handleSubmit = async () => {
    setModalOpen(true);
    try {
      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/orders/add`,
        {
          userId,
          totalAmount: cartValue,
          addressId: selectedAddress?._id,
          paymentMethod,
        }
      );
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <>
      <OrderPlacedModal open={isModalOpen} onClose={closeOrderCompleteModal} />
      <div className="w-full ">
        <Head>
          <title>Checkout - eBookHeaven</title>
          <meta
            name="description"
            content="Complete your purchase securely with our checkout process. Apply discounts, select payment methods, and finalize your order."
          />
          <meta property="og:title" content="Checkout - eBookHeaven" />
        </Head>
        <div className="p-10 bg-gradient-to-t from-slate-50 via-zinc-200 to-slate-300">
          <h1 className="text-center font-extrabold text-3xl ">CHECKOUT</h1>
        </div>
        <div className="flex w-full p-4">
          <div className="w-3/4 flex flex-col space-y-6 h-full mt-4 px-4">
            <div className="w-full flex justify-between">
              <div className="w-1/3 pl-12">
                <p className="text-2xl font-medium text-gray-500">01</p>
                <h2 className="text-2xl font-bold">SELECT AN ADDRESS</h2>
              </div>
              <div className="w-2/3">
                <RadioGroup
                  value={selectedAddress}
                  onValueChange={(value) => setSelectedAddress(value)}
                >
                  {user?.address.map((item, index) => (
                    <div
                      className="flex items-center space-x-2 focus:bg-orange-400"
                      key={index}
                    >
                      <RadioGroupItem
                        value={item}
                        id={index}
                        className="border-black w-fit"
                      />
                      <Label htmlFor={index} className="text-base font-normal">
                        <b>{item.fullName}</b>{" "}
                        {item.line1 +
                          ", " +
                          item.line2 +
                          ", " +
                          item.city +
                          ", " +
                          item.state +
                          ", " +
                          item.pincode +
                          ", " +
                          item.country}
                      </Label>
                    </div>
                  ))}
                </RadioGroup>
              </div>
            </div>
            <div className="w-full flex justify-between">
              <div className="w-1/3 pl-12">
                <p className="text-2xl font-medium text-gray-500">02</p>
                <h2 className="text-2xl font-bold">PAYMENT METHOD</h2>
              </div>
              <div className="w-2/3 flex flex-col my-auto">
                <RadioGroup className="flex justify-evenly">
                  <div
                    className="py-2.5 px-6 flex space-x-4 items-center rounded-lg bg-gray-300 hover:bg-gray-400"
                    onClick={() => setPaymentMethod("cash")}
                  >
                    <Label htmlFor="r1" className="flex items-center">
                      <i className="bx bx-wallet-alt text-2xl mr-2"></i>
                      Cash on Delivery
                    </Label>
                    <RadioGroupItem
                      value="cash"
                      id="r1"
                      className="border-black"
                    />
                  </div>
                  <div
                    className="py-2.5 px-6 flex space-x-4 items-center rounded-lg bg-gray-300 hover:bg-gray-400"
                    onClick={() => setPaymentMethod("card")}
                  >
                    <Label htmlFor="r2" className="flex items-center">
                      <i className="bx bxs-credit-card text-2xl mr-2"></i>{" "}
                      Credit or debit card
                    </Label>
                    <RadioGroupItem
                      value="card"
                      id="r2"
                      className="border-black"
                    />
                  </div>
                </RadioGroup>

                {paymentMethod === "card" ? (
                  <div className="flex space-x-2 p-4 mt-2.5">
                    <div className="w-2/4">
                      <Label>Card Number</Label>
                      <Input
                        type="text"
                        className="flex h-10 w-full rounded-md border border-slate-200 bg-white px-3 py-2 text-sm ring-offset-white file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-slate-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-950 focus-visible:ring-offset-2 disabled:cursor-not-allowed dark:ring-offset-slate-950 dark:placeholder:text-slate-400 dark:focus-visible:ring-slate-300 dark:border-slate-800 dark:bg-slate-950 disabled:opacity-60"
                      />
                    </div>
                    <div className="flex flex-col space-y-2.5">
                      <Label>Expiry Date (MM/YYYY)</Label>
                      <div className="flex items-center">
                        <Input
                          placeholder="MM"
                          className="flex h-10 w-full rounded-md border border-slate-200 bg-white px-3 py-2 text-sm ring-offset-white file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-slate-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-950 focus-visible:ring-offset-2 disabled:cursor-not-allowed dark:ring-offset-slate-950 dark:placeholder:text-slate-400 dark:focus-visible:ring-slate-300 dark:border-slate-800 dark:bg-slate-950 disabled:opacity-60"
                        />
                        /
                        <Input
                          placeholder="YYYY"
                          className="flex h-10 w-full rounded-md border border-slate-200 bg-white px-3 py-2 text-sm ring-offset-white file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-slate-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-950 focus-visible:ring-offset-2 disabled:cursor-not-allowed dark:ring-offset-slate-950 dark:placeholder:text-slate-400 dark:focus-visible:ring-slate-300 dark:border-slate-800 dark:bg-slate-950 disabled:opacity-60"
                        />
                      </div>
                    </div>
                    <div>
                      <Label>CVV</Label>
                      <Input
                        type="number"
                        className="flex h-10 w-full rounded-md border border-slate-200 bg-white px-3 py-2 text-sm ring-offset-white file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-slate-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-950 focus-visible:ring-offset-2 disabled:cursor-not-allowed dark:ring-offset-slate-950 dark:placeholder:text-slate-400 dark:focus-visible:ring-slate-300 dark:border-slate-800 dark:bg-slate-950 disabled:opacity-60"
                      />
                    </div>
                  </div>
                ) : null}
              </div>
            </div>
          </div>
          <div className="w-1/4 p-4 my-2 flex flex-col space-y-5 border rounded-md border-stone-400 shadow bg-gradient-to-t from-slate-50 via-zinc-200 to-slate-300">
            <h1 className="font-extrabold text-xl">ORDER SUMMARY</h1>
            {cartItems.map((item) => (
              <div className="flex space-x-5" key={item._id}>
                <img
                  src={item.imageUrl}
                  alt={item.title}
                  className=" h-auto w-2/12"
                />
                <div className="w-full flex flex-col">
                  <span>
                    <h2 className="font-semibold text-lg">{item.title}</h2>
                    <p className=" font-normal text-gray-500 text-sm">
                      by {item.author}
                    </p>
                  </span>
                  <span className="flex justify-between">
                    <p className="font-medium text-gray-600">₹ {item.price}</p>
                    <p className=" font-medium text-gray-600">
                      Qty: {item.quantity}
                    </p>
                  </span>
                </div>
              </div>
            ))}

            <Separator className="bg-gray-400" />
            <div className="w-full">
              <Label>Discount Code</Label>
              <div className="flex w-full space-x-2">
                <Input
                  placeholder="Enter code"
                  className="flex h-10 w-full rounded-md border border-slate-200 bg-white px-3 py-2 text-sm ring-offset-white file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-slate-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-950 focus-visible:ring-offset-2 disabled:cursor-not-allowed dark:ring-offset-slate-950 dark:placeholder:text-slate-400 dark:focus-visible:ring-slate-300 dark:border-slate-800 dark:bg-slate-950 disabled:opacity-60"
                  ref={couponInput}
                />
                {discountAmt ? (
                  <Button onClick={clearCoupon}>Clear</Button>
                ) : (
                  <Button className="my-auto" onClick={handleCoupon}>
                    Apply
                  </Button>
                )}
              </div>
            </div>
            <div className="flex flex-col ">
              <span className="flex justify-between">
                <p className="font-medium text-gray-600 text-sm">Subtotal: </p>
                <p className="font-bold text-sm">
                  ₹{totalCartValue.toFixed(2)}
                </p>
              </span>
              <span className="flex justify-between">
                <p className="font-medium text-gray-600 text-sm">
                  Discount ({discountPercent}%):
                </p>
                <p className="font-bold text-red-700 text-sm">
                  -₹{discountAmt.toFixed(2)}
                </p>
              </span>
              <Separator className="bg-gray-400 mt-2" />
              <span className="flex justify-between mt-2">
                <p className="font-medium text-gray-600 my-auto text-sm">
                  Total:
                </p>
                <p className="font-bold text-lg" ref={total}>
                  ₹{cartValue.toFixed(2)}
                </p>
              </span>
            </div>
            <Button
              type="submit"
              onClick={handleSubmit}
              disabled={!selectedAddress || !paymentMethod}
            >
              Checkout
            </Button>
          </div>
        </div>
      </div>
    </>
  );
};

export default privateRoute(Checkout);
