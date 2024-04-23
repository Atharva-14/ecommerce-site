import Link from "next/link";
import { useSelector } from "react-redux";

export default function CartButton() {
  const cartQuantity = useSelector((state) => state.cart.totalQuantity);
  return (
    <Link
      href="/cart"
      className=" block text-md px-4  ml-2 py-2 rounded text-blue-700 font-bold hover:text-white mt-4 hover:bg-blue-700 lg:mt-0"
    >
      <span>Cart ({cartQuantity})</span>
    </Link>
  );
}
