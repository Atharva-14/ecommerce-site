import CategoryList from "@/components/Category/CategoryList";

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
  const res = await fetch("http://localhost:3000/api/books");
  const allBooksData = await res.json();

  return {
    props: {
      allBooksData,
    },
    revalidate: 10,
  };
}
