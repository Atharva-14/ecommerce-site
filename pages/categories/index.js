import CategoryList from "@/components/Category/CategoryList";
import { getAllCategory } from "@/lib/services/bookService";

export default function Categories({ allCategoryData }) {
  // const categories = [...new Set(allBooksData.map((book) => book.category))];

  return (
    <div className="flex flex-wrap gap-4 py-2 px-2.5">
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
      allCategoryData 
    },
  };
}
