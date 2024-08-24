import { addItemToCart, removeItemFromCart } from "@/store/async-thunk";
import Link from "next/link";
import { useDispatch } from "react-redux";

export default function CartItem({ ...book }) {
  const { _id, title, imageUrl, author, price, quantity } = book;

  const user = JSON.parse(sessionStorage.getItem("user"));
  const userId = user?._id;

  const dispatch = useDispatch();

  const handleAdd = () => {
    dispatch(addItemToCart({ userId, productId: _id, price }));
  };

  const handleRemove = () => {
    dispatch(removeItemFromCart({ userId, productId: _id, price }));
  };

  return (
    <div className="flex flex-col md:flex-row items-center md:justify-between space-y-4 md:space-y-0 md:space-x-6 p-4 border-b border-gray-300 font-mono">
      {/* Image Section */}
      <img
        src={imageUrl}
        alt={title}
        className="w-24 md:w-32 h-auto object-cover"
      />

      {/* Book Details Section */}
      <div className="flex flex-col md:flex-row md:items-center justify-between w-full md:w-auto md:space-x-6">
        <div className="flex flex-col items-center md:items-start text-center md:text-left">
          <Link
            href={`/books/${_id}`}
            className="font-bold text-xl md:text-2xl hover:underline hover:text-orange-400"
          >
            {title}
          </Link>
          <p className="text-sm md:text-base">by {author}</p>
        </div>

        {/* Quantity and Price Section */}
        <div className="flex justify-center items-center space-x-4 mt-4 md:mt-0">
          <button
            className={`px-3 py-1 rounded-md border ${
              quantity === 0
                ? "bg-gray-500 cursor-not-allowed"
                : "border-gray-300 hover:bg-gray-300"
            }`}
            onClick={handleRemove}
            disabled={quantity === 0}
          >
            -
          </button>
          <p className="text-lg md:text-xl font-medium">{quantity}</p>
          <button
            className="px-3 py-1 rounded-md border border-gray-300 hover:bg-gray-300"
            onClick={handleAdd}
          >
            +
          </button>
        </div>
      </div>

      {/* Price Section */}
      <p className="font-bold text-lg md:text-xl text-center md:text-right mt-4 md:mt-0">
        ₹{price.toFixed(2)}
      </p>
    </div>
  );
}
