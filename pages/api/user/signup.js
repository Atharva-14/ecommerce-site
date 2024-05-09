import { createUserHandler } from "@/lib/controllers/userController";

export default async function handler(req, res) {
  if (req.method === "POST") {
    await createUserHandler(req, res);
  } else {
    res.status(405).json({ message: "Method not allowed" });
  }
}
