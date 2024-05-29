import CategoryList from "@/components/Category/CategoryList";
import axios from "axios";

export default function Categories({ allBooksData }) {
  const categories = [...new Set(allBooksData.map((book) => book.category))];

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

export async function getStaticProps() {
  const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/books`);
  const allBooksData = await res.data;

  return {
    props: {
      allBooksData,
    },
    revalidate: 10,
  };
}
