import MainNavigation from "./MainNavigation";

export const metadata = {
  title: "eBookHaven",
  description: "All types of books are available here.",
};

export default function Layout(props) {
  return (
    <div>
      <MainNavigation />
      <main className="mt-[70px]">{props.children}</main>
    </div>
  );
}
