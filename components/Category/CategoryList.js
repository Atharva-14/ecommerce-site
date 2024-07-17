import { useRouter } from "next/router";

export default function CategoryList({ category }) {
  const route = useRouter();

  function clickHandler() {
    route.push(`categories/${category}`);
  }

  return (
    <div
      onClick={clickHandler}
      className="bg-gradient-to-t from-purple-900 via-indigo-900 to-blue-900 rounded-lg shadow-md flex items-center justify-center cursor-pointer w-52 h-40 "
    >
      <p className="text-center text-lg text-white font-semibold">{category}</p>
    </div>
  );
}
