import Link from "next/link";
import { usePathname } from "next/navigation";

export default function NavLink({ href, label, ...props }) {
  const path = usePathname();

  return (
    <Link
      href={href}
      className={path === href ? "font-semibold" : "font-normal"}
      {...props}
    >
      {label}
    </Link>
  );
}
