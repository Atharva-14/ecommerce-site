import { getBookByIDHandler } from "@/lib/controllers/bookController";
import connectDB from "@/utils/db";

export default async function handler(req, res) {
  await connectDB();

  if (req.method === "GET") {
    await getBookByIDHandler(req, res);
  } else {
    res.status(405).json({ message: "Method not allowed" });
  }
}
