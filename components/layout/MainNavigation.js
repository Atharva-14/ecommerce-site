import Link from "next/link";
import CartButton from "../Cart/CartButton";
import NavLink from "../UI/NavLink";
import SearchBar from "../UI/SearchBar";

export default function MainNavigation() {
  return (
    <nav className="flex items-center justify-between flex-wrap bg-white py-4 lg:px-12 shadow border-solid border-t-2 border-blue-700">
      <div className="flex justify-between lg:w-auto w-full lg:border-b-0 pl-6 pr-2 border-solid border-b-2 border-gray-300 pb-5 lg:pb-0">
        <div className="flex items-center flex-shrink-0 text-gray-800 mr-16">
          <Link href="/" className="font-semibold text-xl tracking-tight">
            eBookHaven
          </Link>
        </div>
        <div className="block lg:hidden ">
          <button
            id="nav"
            className="flex items-center px-3 py-2 border-2 rounded text-blue-700 border-blue-700 hover:text-blue-700 hover:border-blue-700"
          >
            <svg
              className="fill-current h-3 w-3"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <title>Menu</title>
              <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z" />
            </svg>
          </button>
        </div>
      </div>

      <div className="menu w-full flex-grow lg:flex lg:items-center lg:w-auto lg:px-3 px-8">
        <div className="text-md font-bold text-blue-700 flex-grow">
          <NavLink href="/" label="Home" />
          <NavLink href="/categories" label="Shop by Category" />
        </div>
        <SearchBar />

        <div className="flex text-blue-700 text-md font-bold">
          <NavLink href="/login" label="Login" />
          <CartButton />
        </div>
      </div>
    </nav>
  );
}
