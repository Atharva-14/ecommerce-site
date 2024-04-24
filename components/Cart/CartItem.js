import { cartActions } from "@/store/cart-slice";
import Link from "next/link";
import { useDispatch } from "react-redux";

export default function CartItem(props) {
  const dispatch = useDispatch();
  const { id, title, imageUrl, author, price, quantity, total } = props;

  function addItemToCart() {
    dispatch(
      cartActions.addItemToCart({
        id,
        title,
        imageUrl,
        author,
        price,
      })
    );
  }

  function removeItemFromCart() {
    dispatch(cartActions.removeItemFromCart(id));
  }

  return (
    <div className="flex space-x-3 m-4 p-4 font-mono justify-around ">
      <div className="flex space-x-20">
        <img src={imageUrl} alt={title} className=" h-auto w-2/12" />

        <div className="flex flex-col justify-around">
          <span className="">
            <Link
              href={`/books/${id}`}
              className="font-bold text-4xl hover:text-blue-600"
            >
              {title}
            </Link>
            <p>by {author}</p>
          </span>
          <span className="flex flex-row space-x-4">
            <button
              className="px-2 rounded-md border border-gray-300 hover:bg-gray-300 text-xl"
              onClick={removeItemFromCart}
            >
              -
            </button>
            <p className="text-xl font-medium">{quantity}</p>
            <button
              className="px-2 rounded-md border border-gray-300 hover:bg-gray-300 text-xl"
              onClick={addItemToCart}
            >
              +
            </button>
          </span>
        </div>
      </div>
      <p className="font-medium text-xl">₹{total.toFixed(2)}</p>
    </div>
  );
}
