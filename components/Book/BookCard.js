import Image from "next/image";
import Link from "next/link";

export default function BookCard(props) {
  const { id, title, imageUrl, author, price } = props;

  return (
    <div className="flex flex-row rounded shadow-lg bg-white">
      <div className="flex-none h-40 -mt-4 relative">
        <img src={imageUrl} alt="Book Cover" className="max-h-40"/>
      </div>
      <div className="flex items-center justify-center mx-1.5">
        <div className="flex-col space-y-1.5">
          <Link href={`/books/${id}`} className="font-bold text-xl">
            {title}
          </Link>
          <p className="font-medium text-gray-400 text-sm">By {author}</p>
          <div className="font-bold text-2xl">₹{price}</div>
        </div>
      </div>
    </div>
  );
}
