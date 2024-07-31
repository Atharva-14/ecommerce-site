import axios from "axios";
import { useState } from "react";
import QuantityDropdown from "../UI/QuantityDropdown";
import { useAuth } from "@/context/AuthContext";
import { CheckIcon, HeartIcon, Share2Icon } from "lucide-react";
import { Separator } from "../UI/separator";
import { useToast } from "../ui/use-toast";
import { useRouter } from "next/router";
import { ToastAction } from "../UI/toast";

export default function BookDetail({ props }) {
  const { user } = useAuth();
  const { toast } = useToast();
  const router = useRouter();
  const [selectedQuantity, setSelectedQuantity] = useState(1);
  const { _id, title, imageUrl, author, price, description } = props;

  const addItemToCart = async () => {
    if (user) {
      try {
        const res = await axios.post(
          `${process.env.NEXT_PUBLIC_API_URL}/cart/add`,
          {
            userId: user?._id,
            productId: _id,
            quantity: selectedQuantity,
          }
        );
        toast({ variant: "constructive",description: "Added To Cart" });
      } catch (error) {
        console.log("Add to cart err: ", error.message);
      }
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
              onClick={addItemToCart}
            >
              ADD TO CART
            </button>
            <button className="border-2 border-black p-2 ">
              <HeartIcon className="text-2xl" />
            </button>
            <button>
              <Share2Icon className="text-3xl m-auto" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
