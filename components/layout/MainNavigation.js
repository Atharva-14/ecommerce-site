import Link from "next/link";
import { useState } from "react";
import { useAuth } from "@/context/AuthContext";
import SearchModal from "../UI/SearchModal";
import { Heart, LogOut, PackageIcon, Search, ShoppingCartIcon, User } from "lucide-react";
import { usePathname } from "next/navigation";
import { useRouter } from "next/router";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/UI/dropdown-menu";

export default function MainNavigation() {
  const path = usePathname();
  const route = useRouter();
  const [isSearchOpen, setSearchOpen] = useState(false);
  const { logoutUser, user } = useAuth();

  const logout = () => {
    logoutUser();
    route.push("/");
  };

  const openSearch = () => setSearchOpen(true);
  const closeSearch = () => setSearchOpen(false);

  return (
    <>
      <SearchModal open={isSearchOpen} onClose={closeSearch} />
      <nav className="flex justify-between px-16 py-5 shadow fixed w-full top-0 left-0 bg-white">
        <div className="focus:outline-none">
          <Link href="/" className="font-semibold text-xl">
            eBookHaven
          </Link>
        </div>

        <div className="flex space-x-10 my-auto">
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
            href="/categories"
            className={`text-lg ${
              path === "/categories"
                ? "font-bold"
                : "font-normal hover:font-medium hover:underline"
            }`}
          >
            Category
          </Link>
        </div>

        <div className="my-auto">
          {user ? (
            <div className="flex space-x-5">
              <button
                onClick={openSearch}
                className=" mx-auto my-auto focus:outline-none"
              >
                <Search />
              </button>

              {/* <button className=" mx-auto my-auto focus:outline-none">
                <Link href="/wishlist">
                  <Heart
                    className={`${path === "/wishlist" ? "text-red-500" : ""}`}
                  />
                </Link>
              </button> */}

              <button className=" mx-auto my-auto">
                <Link href="/cart">
                  <ShoppingCartIcon
                    className={`${path === "/cart" ? "text-red-500" : ""}`}
                  />
                </Link>
              </button>

              <DropdownMenu>
                <DropdownMenuTrigger>
                  Hello, {user.firstName}
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuLabel>My Account</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <Link href="/profile">
                    <DropdownMenuItem>
                      <User className="mr-2 h-4 w-4" /> Profile
                    </DropdownMenuItem>
                  </Link>
                  <Link href="/orders">
                    <DropdownMenuItem>
                      <PackageIcon className="mr-2 h-4 w-4" /> Orders
                    </DropdownMenuItem>
                  </Link>
                  <DropdownMenuItem onClick={logout}>
                    <LogOut className="mr-2 h-4 w-4" />
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
      </nav>
    </>
  );
}
