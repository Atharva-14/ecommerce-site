import Link from "next/link";

export default function BookCard(props) {
  const { id, title, imageUrl, author, price } = props;

  return (
    <div className="flex flex-row rounded-lg shadow hover:drop-shadow-lg hover:bg-slate-50 bg-white space-x-4 p-2">
      <div className="flex-none h-40">
        <img src={imageUrl} alt="Book Cover" className="max-h-40 p-2" />
      </div>
      <div className=" my-auto space-y-1.5">
        <Link
          href={`/books/${id}`}
          className="font-bold text-xl hover:underline hover:text-orange-500"
        >
          {title}
        </Link>
        <p className="font-medium text-gray-400 text-sm">By {author}</p>
        <div className="font-bold text-2xl">₹{price}</div>
      </div>
    </div>
  );
}
