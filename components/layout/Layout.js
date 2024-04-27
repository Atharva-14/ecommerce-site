import MainNavigation from "./MainNavigation";

export const metadata = {
  title: "eBookHaven",
  description: "All types of books are available here.",
};

export default function Layout(props) {
  return (
    <div className="fixed top-0 w-full z-10">
      <MainNavigation />
      <main className="px-3 py-4 bg-slate-100">{props.children}</main>
    </div>
  );
}
