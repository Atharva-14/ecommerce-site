import Link from "next/link";
import { usePathname } from "next/navigation";

export default function NavLink({ href, label }) {
  const path = usePathname();

  const inactiveClass =
    "block mt-4 lg:inline-block lg:mt-0 hover:text-white px-4 py-2 rounded hover:bg-blue-700 mr-2";

  const activeClass =
    "block mt-4 lg:inline-block lg:mt-0 text-white px-4 py-2 rounded bg-blue-700 mr-2";

  return (
    <Link
      href={href}
      className={path === href ? `${activeClass}` : `${inactiveClass}`}
    >
      {label}
    </Link>
  );
}
