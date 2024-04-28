import Link from "next/link";

export default function BookCard(props) {
  const { id, title, imageUrl, author, price } = props;

  return (
    <div className="flex flex-col items-center bg-white w-80 h-auto m-1 p-3 rounded-md shadow-xl">
      <img src={imageUrl} alt={title} className="w-36 h-56 m-1.5 rounded-lg" />
      <span className="text-center max-w-xs text-wrap mx-auto py-4">
        <Link
          href={`/books/${id}`}
          className="font-bold text-4xl hover:text-blue-600 p-1.5"
        >
          {title}
        </Link>
        <div className="flex justify-center space-x-10 ">
          <p>by {author}</p>
          <p className="font-semibold text-2xl">₹{price}</p>
        </div>
      </span>
    </div>
  );
}
