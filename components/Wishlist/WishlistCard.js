import Image from "next/image";
import Link from "next/link";
import { Button } from "../UI/button";

export default function WishlistCard(props) {
  const { id, title, imageUrl, author, price } = props;
  return (
    <div className="p-4 flex flex-row space-x-2 w-full mb-4 border-b border-gray-700">
      <div className=" flex-none">
        <Image src={imageUrl} alt="Image" width={67} height={100} />
      </div>
      <div className="w-full flex flex-row items-center justify-between">
        <div className="flex flex-col">
          <Link
            href={`/books/${id}`}
            className="font-serif text-gray-900 dark:text-yellow-50 underline-offset-4 text-lg underline hover:no-underline decoration-gray-300 dark:decoration-gray-500"
          >
            {title}
          </Link>
          <span>By {author}</span>
          <span className="font-medium">₹ {price}</span>
        </div>
        <div className="p-2 flex flex-col space-y-1.5">
          <Button>Add to cart</Button>
          <Button>Remove from Wishlist</Button>
        </div>
      </div>
    </div>
  );
}
