import { loginUserHandler } from "@/lib/controllers/userController";

export default async function handler(req, res) {
  if (req.method === "POST") {
    await loginUserHandler(req, res);
  } else {
    res.status(405).json({ messgae: "Method not allowed" });
  }
}
