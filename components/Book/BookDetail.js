import axios from "axios";
import { useState } from "react";
import QuantityDropdown from "../UI/QuantityDropdown";
import { useAuth } from "@/context/AuthContext";
import { Separator } from "../UI/separator";
import { useToast } from "../ui/use-toast";
import { useRouter } from "next/router";
import { ToastAction } from "../UI/toast";
import { useDispatch } from "react-redux";
import { addItemToCart } from "@/store/async-thunk";

export default function BookDetail({ props }) {
  const { user } = useAuth();
  const { toast } = useToast();
  const router = useRouter();
  const [selectedQuantity, setSelectedQuantity] = useState(1);
  const { _id, title, imageUrl, author, price, description } = props;

  const dispatch = useDispatch();

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

  console.log(selectedQuantity);

  return (
    <div className="flex justify-evenly space-x-10">
      <div className="w-1/2 p-4 items-center m-auto">
        <img
          src={imageUrl}
          alt={title}
          className="border-white w-2/4 rounded-3xl p-4 mx-auto"
        />
      </div>
      <div className="w-1/2 flex flex-col space-y-6 m-auto p-2.5">
        <div className="space-y-2">
          <div className="space-y-2">
            <h1 className="font-bold text-3xl">{title}</h1>
            <p className=" font-semibold">by {author}</p>
            <p className="font-bold text-xl">₹{price}</p>
          </div>

          <div className="space-y-2">
            <span className=" max-w-fit">
              <p className=" font-medium">About this Book</p>
              <Separator className="bg-gray-400 w-32" />
            </span>
            <p>{description}</p>
          </div>
        </div>

        <div className="flex flex-col">
          <p className=" font-medium">Quantity:</p>
          <div className="flex space-x-5 py-2.5">
            <QuantityDropdown onChange={handleQuantityChange} />
            <button
              className="border-2 border-black py-2 px-6 bg-black text-white font-medium "
              onClick={handleAddToCart}
            >
              ADD TO CART
            </button>
            <button className="flex items-center px-1 border-2 border-black  ">
              <i className="bx bx-heart text-3xl"></i>
            </button>
            <button className="flex items-center">
              <i className="bx bx-share-alt text-3xl"></i>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
