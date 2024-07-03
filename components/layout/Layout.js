import MainNavigation from "./MainNavigation";

export const metadata = {
  title: "eBookHaven",
  description: "All types of books are available here.",
};

export default function Layout(props) {
  return (
    <div className="">
      <MainNavigation />
      <main className="mx-2 bg-white">{props.children}</main>
    </div>
  );
}
