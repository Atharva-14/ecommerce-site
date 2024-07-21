import { getBookByID } from "@/lib/services/bookService";
import { findUserById } from "@/lib/services/userService";
import orders from "@/pages/orders";

export default async function handler(req, res) {
  const { userId } = req.query;

  try {
    const user = await findUserById(userId);

    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }

    const pastOrders = user.pastOrders;

    const pastOrdersDetails = await Promise.all(
      pastOrders.map(async (order) => {
        const bookDetails = await Promise.all(
          order.item.map(async (book) => {
            const bookDetailsDoc = await getBookByID(book.bookId);
            return {
              ...bookDetailsDoc,
              quantity: book.quantity,
            };
          })
        );
        return {
          item: bookDetails,
          address: order.address,
          totalAmount: order.totalAmount,
          paymentMethod: order.paymentMethod,
          id: order._id,
          orderDate: order.orderDate,
        };
      })
    );

    res
      .status(200)
      .json({ success: true, pastOrdersDetails, message: "Past orders found" });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch orders",
      error: error.message,
    });
  }
}
