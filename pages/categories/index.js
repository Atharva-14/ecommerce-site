import CategoryList from "@/components/Category/CategoryList";
import { getAllCategory } from "@/lib/services/bookService";

export default function Categories({ allCategoryData }) {
  // const categories = [...new Set(allBooksData.map((book) => book.category))];

  return (
    <div className="flex flex-wrap gap-3 px-5 py-4">
      {allCategoryData.map((category, index) => (
        <CategoryList key={index} category={category} />
      ))}
    </div>
  );
}

export async function getStaticProps() {
  const allCategoryData = await getAllCategory();

  return {
    props: {
      allCategoryData,
    },
  };
}
