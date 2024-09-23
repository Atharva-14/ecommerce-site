import Link from "next/link";
import { useEffect, useState } from "react";
import { useAuth } from "@/context/AuthContext";
import SearchModal from "../UI/SearchModal";
import { usePathname } from "next/navigation";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/UI/dropdown-menu";
import Avatar from "boring-avatars";
import { useDispatch } from "react-redux";
import { cartActions } from "@/store/cart-slice";

export default function MainNavigation() {
  const path = usePathname();
  const [isSearchOpen, setSearchOpen] = useState(false);
  const { logoutUser, user } = useAuth();
  const [scrollPosition, setScrollPosition] = useState(0);
  const [isScrollingUp, setIsScrollingUp] = useState(true);
  const [isAvatarHovered, setIsAvatarHovered] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false); // State for mobile menu
  const dispatch = useDispatch();

  const logout = () => {
    logoutUser(dispatch);
    dispatch(cartActions.resetCartState());
  };

  const openSearch = () => setSearchOpen(true);
  const closeSearch = () => setSearchOpen(false);

  const handleShortcut = (event) => {
    if (
      (event.ctrlKey || event.metaKey) &&
      (event.key === "k" || event.key === "K")
    ) {
      event.preventDefault();
      setSearchOpen((prev) => !prev);
    }
  };

  const handleScroll = () => {
    const currentScrollingPos = window.pageYOffset;
    if (currentScrollingPos < scrollPosition) {
      setIsScrollingUp(true);
    } else {
      setIsScrollingUp(false);
    }
    setScrollPosition(currentScrollingPos);
  };

  useEffect(() => {
    window.addEventListener("keydown", handleShortcut);
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("keydown", handleShortcut);
      window.removeEventListener("scroll", handleScroll);
    };
  }, [handleShortcut, handleScroll]);

  return (
    <nav
      className={`w-full top-0 z-30 ease-in-out duration-200 sticky mx-auto bg-white bg-transparent transition-transform ${
        isScrollingUp ? "translate-y-0" : "-translate-y-full"
      }`}
    >
      <div className="sm:py-2 mx-auto flex items-center justify-between h-14 lg:h-16 px-4 md:px-8 max-w-7xl border-b border-gray-300">
        <SearchModal open={isSearchOpen} onClose={closeSearch} />
        
        {/* Logo */}
        <Link href="/" className="font-semibold text-xl">
          eBookHeaven
        </Link>

        {/* Hamburger Menu (Mobile) */}
        <div className="lg:hidden">
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="text-3xl focus:outline-none"
          >
            <i className="bx bx-menu"></i>
          </button>
        </div>

        {/* Links and Avatar for Desktop */}
        <div className="hidden lg:flex items-center space-x-4 md:space-x-6 lg:space-x-8">
          <Link
            href="/"
            className={`text-lg ${
              path === "/"
                ? "font-bold"
                : "font-normal hover:font-medium hover:underline"
            }`}
          >
            Home
          </Link>
          <Link
            href="/store"
            className={`text-lg ${
              path === "/store"
                ? "font-bold"
                : "font-normal hover:font-medium hover:underline"
            }`}
          >
            Store
          </Link>

          {/* Search Button */}
          <button
            onClick={openSearch}
            className="bg-gray-100 dark:bg-gray-800 hover:bg-gray-50 max-w-[150px] md:max-w-[200px] lg:max-w-[250px] sm:text-sm ring-2 ring-inset ring-gray-200 rounded-lg px-2 py-2 flex justify-between items-center transition-all cursor-pointer"
          >
            <div className="flex items-center">
              <i className="bx bx-search text-2xl md:text-3xl"></i>
              <p className="hidden md:block ml-2 font-semibold text-gray-700 whitespace-nowrap">
                Search
              </p>
            </div>
            <span className="hidden lg:block ml-4 bg-gray-300 text-gray-600 px-1 py-0.5 rounded font-bold whitespace-nowrap">
              Ctrl K
            </span>
          </button>

          {/* User Avatar / Dropdown */}
          {user ? (
            <div className="flex items-center space-x-4 lg:space-x-6 relative">
              <Link
                href="/cart"
                className={`flex items-center px-2 py-1 border rounded-md border-gray-300 ${
                  path === "/cart"
                    ? "bg-gray-300 text-gray-700"
                    : "hover:border-gray-200 hover:bg-slate-100"
                }`}
              >
                <i className="bx bx-cart text-2xl md:text-3xl"></i>
                <p
                  className={`text-lg ${path === "/cart" ? "font-medium" : ""}`}
                >
                  Cart
                </p>
              </Link>

              <DropdownMenu>
                <DropdownMenuTrigger
                  onMouseEnter={() => setIsAvatarHovered(true)}
                  onMouseLeave={() => setIsAvatarHovered(false)}
                  className="relative group"
                >
                  <Avatar name={user?.firstName} variant="beam" />
                  {isAvatarHovered && (
                    <div className="absolute top-full left-1 transform -translate-x-1/2 mt-2 bg-gray-800 text-white text-sm rounded-md p-2 shadow-md">
                      <p>{user?.firstName + " " + user?.lastName}</p>
                      <p>{user?.email}</p>
                    </div>
                  )}
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuLabel>My Account</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <Link href="/profile">
                    <DropdownMenuItem>
                      <i className="bx bx-user font-medium text-lg mr-2"></i>
                      Profile
                    </DropdownMenuItem>
                  </Link>
                  <Link href="/wishlist">
                    <DropdownMenuItem>
                      <i className="bx bx-heart font-medium text-lg mr-2"></i>
                      Wishlist
                    </DropdownMenuItem>
                  </Link>
                  <Link href="/orders">
                    <DropdownMenuItem>
                      <i className="bx bx-package font-medium text-lg mr-2"></i>
                      Orders
                    </DropdownMenuItem>
                  </Link>
                  <DropdownMenuItem onClick={logout}>
                    <i className="bx bx-log-out font-medium text-lg mr-2"></i>
                    <span>Log out</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          ) : (
            <Link
              href="/login"
              className={`text-lg ${
                path === "/login"
                  ? "font-semibold"
                  : "font-normal hover:font-medium hover:underline"
              }`}
            >
              Sign In
            </Link>
          )}
        </div>

        {/* Mobile Menu */}
        {menuOpen && (
          <div className="lg:hidden flex flex-col absolute top-full left-0 w-full bg-white shadow-lg z-50">
            <Link
              href="/"
              className="block px-4 py-2 text-lg hover:bg-gray-200"
              onClick={() => setMenuOpen(false)}
            >
              Home
            </Link>
            <Link
              href="/store"
              className="block px-4 py-2 text-lg hover:bg-gray-200"
              onClick={() => setMenuOpen(false)}
            >
              Store
            </Link>
            <Link
              href="/cart"
              className="block px-4 py-2 text-lg hover:bg-gray-200"
              onClick={() => setMenuOpen(false)}
            >
              Cart
            </Link>
            {user ? (
              <>
                <Link
                  href="/profile"
                  className="block px-4 py-2 text-lg hover:bg-gray-200"
                  onClick={() => setMenuOpen(false)}
                >
                  Profile
                </Link>
                <Link
                  href="/wishlist"
                  className="block px-4 py-2 text-lg hover:bg-gray-200"
                  onClick={() => setMenuOpen(false)}
                >
                  Wishlist
                </Link>
                <Link
                  href="/orders"
                  className="block px-4 py-2 text-lg hover:bg-gray-200"
                  onClick={() => setMenuOpen(false)}
                >
                  Orders
                </Link>
                <button
                  onClick={() => {
                    logout();
                    setMenuOpen(false);
                  }}
                  className="block w-full text-left px-4 py-2 text-lg hover:bg-gray-200"
                >
                  Logout
                </button>
              </>
            ) : (
              <Link
                href="/login"
                className="block px-4 py-2 text-lg hover:bg-gray-200"
                onClick={() => setMenuOpen(false)}
              >
                Sign In
              </Link>
            )}
          </div>
        )}
      </div>
    </nav>
  );
}
