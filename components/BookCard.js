import { cartActions } from "@/store/cart-slice";
import Link from "next/link";
import { useDispatch } from "react-redux";

export default function BookCard(props) {
  const dispatch = useDispatch();
  const { id, title, imageUrl, author, price } = props;

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

  return (
    <div className="flex items-center space-x-6 rounded-lg mx-4 my-6 p-6 shadow font-mono justify-between bg-pink-50">
      <img src={imageUrl} alt={title} className="w-3/12 rounded-lg" />
      <span className="flex flex-col space-y-1 justify-start">
        <Link
          href={`/books/${id}`}
          className="font-bold text-4xl hover:text-blue-600"
        >
          {title}
        </Link>
        <p>by {author}</p>
        <p className="font-semibold text-2xl">₹{price}</p>
      </span>
      <button className="p-2.5 bg-white rounded shadow" onClick={addItemToCart}>
        Add To Cart
      </button>
    </div>
  );
}
