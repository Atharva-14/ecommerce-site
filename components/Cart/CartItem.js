import Link from "next/link";

export default function CartItem({ addToCart, removeFromCart, ...book }) {
  const { _id, title, imageUrl, author, price, quantity } = book;

  const user = JSON.parse(sessionStorage.getItem("user"));
  const userId = user?._id;

  const handleAdd = (id, price) => {
    addToCart(id, price, userId);
  };

  const handleRemove = (id, price) => {
    removeFromCart(id, price, userId);
  };

  return (
    <div className="flex space-x-3 m-4 p-4 font-mono justify-around ">
      <div className="flex space-x-20">
        <img src={imageUrl} alt={title} className=" h-auto w-2/12" />

        <div className="flex flex-col justify-around">
          <span className="">
            <Link
              href={`/books/${_id}`}
              className="font-bold text-4xl hover:underline hover:text-orange-400"
            >
              {title}
            </Link>
            <p>by {author}</p>
          </span>
          <span className="flex flex-row space-x-4">
            <button
              className={`px-2 rounded-md border ${
                quantity === 0
                  ? "bg-gray-500 cursor-not-allowed"
                  : "border-gray-300 hover:bg-gray-300 text-xl"
              } `}
              onClick={() => handleRemove(_id, price)}
              disabled={quantity === 0 ? true : false}
            >
              -
            </button>
            <p className="text-xl font-medium">{quantity}</p>
            <button
              className="px-2 rounded-md border border-gray-300 hover:bg-gray-300 text-xl"
              onClick={() => handleAdd(_id, price)}
            >
              +
            </button>
          </span>
        </div>
      </div>
      <p className="font-bold text-xl">₹{price.toFixed(2)}</p>
    </div>
  );
}
