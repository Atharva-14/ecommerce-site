import CategoryList from "@/components/Category/CategoryList";
import { DUMMY_BOOKS_DATA } from "@/utils/data";

export default function Categories() {
  const categories = [
    ...new Set(DUMMY_BOOKS_DATA.map((book) => book.category)),
  ];

  return (
    <div>
      <div className="flex flex-wrap gap-12">
        {categories.map((category, index) => (
          <CategoryList key={index} category={category} />
        ))}
      </div>
    </div>
  );
}
