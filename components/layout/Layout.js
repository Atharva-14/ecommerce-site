import MainNavigation from "./MainNavigation";

export default function Layout(props) {
  return (
    <div>
      <MainNavigation />
      <main className="px-3 py-4 bg-slate-100">{props.children}</main>
    </div>
  );
}
