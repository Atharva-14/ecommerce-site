import BookCard from "@/components/Book/BookCard";
import { getAllBooks } from "@/lib/services/bookService";

export default function Category({ books }) {
  return (
    <div className="flex flex-wrap">
      {books.map((book) => (
        <div key={book._id} className="w-full sm:w-1/2 lg:w-1/3 p-4">
          <BookCard
            key={book._id}
            id={book._id}
            title={book.title}
            imageUrl={book.imageUrl}
            author={book.author}
            price={book.price}
          />
        </div>
      ))}
    </div>
  );
}

// export async function getStaticPaths() {
//   try {
//     let allCategoryData = await getAllCategory();
//     allCategoryData = JSON.parse(JSON.stringify(allCategoryData));
//     console.log(allBooksData);

//     const categories = [
//       ...new Set(
//         allBooksData.map((book) => ({
//           params: {
//             category: book.category,
//           },
//         }))
//       ),
//     ];

//     return {
//       paths: categories,
//       fallback: false,
//     };
//   } catch (error) {
//     console.log(error);
//   }
// }

export async function getServerSideProps({ params }) {
  const category = params.category;
  console.log(params);

  let allBooksData = await getAllBooks(category);

  allBooksData = JSON.parse(JSON.stringify(allBooksData));

  // const bookCategory = [];

  // allBooksData.map((book) => {
  //   if (book.category === category) {
  //     bookCategory.push(book);
  //   }
  // });

  return {
    props: {
      books: allBooksData,
    },
  };
}
