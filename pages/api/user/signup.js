import { createUser, findUserByEmail } from "@/lib/services/userService";
import jwt from "jsonwebtoken";
export default async function handler(req, res) {
  if (req.method === "POST") {
    const { firstName, lastName, email, password } = req.body;
    try {
      const exisitingUser = await findUserByEmail(email);

      if (exisitingUser) {
        return res.status(400).json({
          success: false,
          message: "User with this email already exists",
        });
      }

      const user = await createUser({ firstName, lastName, email, password });

      const token = jwt.sign({ userId: user._id }, process.env.SECRET_KEY, {
        expiresIn: "1h",
      });

      res.status(200).json({
        success: true,
        user,
        token,
        message: "Account created successfully.",
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: "Failed to create user",
        error: error.message,
      });
    }
  } else {
    res.status(405).json({ message: "Method not allowed" });
  }
}
