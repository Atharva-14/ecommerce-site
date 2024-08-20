import "boxicons/css/boxicons.min.css";
import Image from "next/image";
import Link from "next/link";
import shoppingCart from "@/public/undraw_shopping.svg";
import { Input } from "../UI/input";
import { Button } from "../UI/button";

export default function Footer() {
  return (
    <div className="mx-auto px-2 lg:px-0 my-4 max-w-7xl hidden lg:block mt-8 pt-8 overflow-hidden h-full border-t border-gray-200">
      <div className="flex flex-row w-full gap-3 justify-between px-6 xl:px-3">
        <div className="flex flex-col gap-2 ">
          <h1 className="font-semibold text-2xl">eBookHaven</h1>
          <Link
            href="https://github.com/Atharva-14/ecommerce-site"
            className="flex items-center space-x-2 text-gray-500 transition duration-300 ease-in-out hover:text-black "
            target="_blank"
          >
            <i className="bx bxl-github text-3xl"></i>
            <p className="">Source Code</p>
          </Link>
          <p>Made by Atharva</p>
          <div className="">
            <Link
              className="transition duration-300 ease-in-out underline-offset-2 text-gray-600 hover:text-black text-3xl underline hover:no-underline decoration-gray-300"
              href="https://github.com/Atharva-14/ecommerce-site"
              target="_blank"
            >
              <i className="bx bxl-github mr-2 text-3xl"></i>
            </Link>
            <Link
              className="transition duration-300 ease-in-out underline-offset-2 text-gray-600 hover:text-blue-800 text-3xl underline hover:no-underline decoration-gray-300"
              href="https://www.linkedin.com/in/atharva-muratkar/"
              target="_blank"
            >
              <i className="bx bxl-linkedin-square mr-2 text-3xl "></i>
            </Link>
            <Link
              className="transition duration-300 ease-in-out underline-offset-2 text-gray-600 hover:text-blue-400 text-3xl underline hover:no-underline decoration-gray-300"
              href="https://x.com/Atharva_142"
              target="_blank"
            >
              <i className="bx bxl-twitter mr-2 text-3xl "></i>
            </Link>
          </div>
        </div>
        <div className="flex flex-col gap-2 ">
          <h5 className="font-medium text-xl">Menu</h5>

          <Link
            className="hover:font-medium hover:underline transition duration-300 ease-in-out text-lg"
            href="/"
          >
            Home
          </Link>
          <Link
            className="hover:font-medium hover:underline transition duration-300 ease-in-out text-lg"
            href="/cart"
          >
            Cart
          </Link>
          <Link
            className="hover:font-medium hover:underline transition duration-300 ease-in-out text-lg"
            href="/wishlist"
          >
            WishList
          </Link>
          <Link
            className="hover:font-medium hover:underline transition duration-300 ease-in-out text-lg"
            href="/profile"
          >
            Profile
          </Link>
        </div>
        <div className="space-y-6">
          <Image src={shoppingCart} alt="SVG as Image" width={200} />
          <div className="px-2.5">
            <h3 className="text-lg font-medium">Newsletter</h3>
            <div className="flex space-x-2">
              <Input placeholder="Email Address" className="w-[200px]" />
              <Button>SUBSCRIBE</Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
