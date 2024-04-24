import { cartActions } from "@/store/cart-slice";
import { useRouter } from "next/router";
import { useDispatch } from "react-redux";

export default function BookDetail({ props }) {
  const router = useRouter();
  const dispatch = useDispatch();
  const { id, title, imageUrl, author, price, description } = props;

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
    setTimeout(() => {
      router.push("/cart");
    }, 900);
  }

  return (
    <div className="flex font-mono justify-evenly space-x-10">
      <div className="flex space-x-10 ">
        <img src={imageUrl} alt={title} className=" h-auto w-4/12" />

        <div className="flex flex-col space-y-10">
          <div>
            <h1 className="font-bold text-3xl">{title}</h1>
            <p className="mt-2">by {author}</p>
          </div>
          <div>
            <label>About this Book</label>
            <hr className="h-0.5 bg-gray-400" />
            <p>{description}</p>
          </div>
        </div>
      </div>
      <div className="h-full flex flex-col space-y-4 bg-white p-5 text-center rounded border-gray-300 border-4">
        <p className="font-medium text-xl">₹{price}</p>
        <button
          className="border rounded-lg shadow border-gray-300 mx-auto p-1.5 hover:bg-gray-400 "
          onClick={addItemToCart}
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
}
