import Footer from "./Footer";
import MainNavigation from "./MainNavigation";

export const metadata = {
  title: "eBookHaven",
  description: "All types of books are available here.",
};

export default function Layout(props) {
  return (
    <div className="w-full">
      <MainNavigation />
      <main>{props.children}</main>
      <Footer />
    </div>
  );
}
