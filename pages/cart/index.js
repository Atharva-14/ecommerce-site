import CartItem from "@/components/Cart/CartItem";
import { DUMMY_BOOKS_DATA } from "@/utils/data";
import { useSelector } from "react-redux";

export default function Cart() {
  const cartItems = useSelector((state) => state.cart.books);
  const cartQuantity = useSelector((state) => state.cart.totalQuantity);
  const totalCartValue = cartItems.reduce(
    (total, book) => total + book.totalPrice,
    0
  );

  console.log(DUMMY_BOOKS_DATA.map((book) => book.category));

  return (
    <div className="p-4 w-full flex space-x-3 bg-gray-200">
      <div className="w-3/4 bg-white p-5">
        <p className="text-2xl font-medium">Shopping Cart</p>
        <hr className="mt-6" />
        {cartQuantity ? (
          cartItems.map((book) => (
            <CartItem
              key={book.id}
              id={book.id}
              title={book.title}
              imageUrl={book.imageUrl}
              author={book.author}
              price={book.price}
              total={book.totalPrice}
              quantity={book.quantity}
            />
          ))
        ) : (
          <p className=" text-xl text-center my-5">Your Cart is empty</p>
        )}
      </div>
      <div className="w-1/4 h-full flex flex-col space-y-4 bg-white p-5">
        <p className="text-center font-medium text-lg">
          SubTotal ({cartQuantity} item): ₹{totalCartValue.toFixed(2)}
        </p>
        {cartQuantity ? (
          <button className="border rounded-lg shadow border-gray-300 mx-auto p-1.5 hover:bg-gray-300 ">
            Proceed to Buy
          </button>
        ) : (
          ""
        )}
      </div>
    </div>
  );
}
