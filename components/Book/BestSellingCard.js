import Link from "next/link";

export default function BestSellingCard(props) {
  const { id, title, imageUrl, author, price, bestselling } = props;

  return (
    <div className="relative flex flex-row rounded-lg shadow hover:drop-shadow-lg hover:bg-slate-50 bg-white p-4 space-x-4 max-w-sm w-full mx-auto">
      {/* bestselling Badge */}
      <div className="absolute top-2 left-2 bg-orange-500 text-white font-bold rounded-full px-3 py-1 text-xs">
        #{bestselling}
      </div>

      {/* Book Image */}
      <div className="flex-none w-28 h-40 overflow-hidden">
        <img
          src={imageUrl}
          alt="Book Cover"
          className="h-full w-full object-cover p-2"
        />
      </div>

      {/* Book Details */}
      <div className="flex flex-col justify-center space-y-1.5">
        <Link
          href={`/books/${id}`}
          className="font-bold text-lg hover:underline hover:text-orange-500"
        >
          {title}
        </Link>
        <p className="font-medium text-gray-400 text-sm">By {author}</p>
        <div className="font-bold text-xl text-orange-600">₹{price}</div>
      </div>
    </div>
  );
}
