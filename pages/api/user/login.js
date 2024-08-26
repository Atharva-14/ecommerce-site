import {
  findUserByEmail,
  validateUserPassword,
} from "@/lib/services/userService";
import jwt from "jsonwebtoken";
import { serialize } from "cookie";

export default async function handler(req, res) {
  if (req.method === "POST") {
    const { email, password } = req.body;

    try {
      const user = await findUserByEmail(email);

      if (!user) {
        return res.status(400).json({
          success: false,
          message: "User not found with this email",
        });
      }

      const isPasswordValid = await validateUserPassword(user, password);
      if (!isPasswordValid) {
        return res.status(400).json({
          success: false,
          message: "Invalid Password",
        });
      }

      const token = jwt.sign({ userId: user._id }, process.env.SECRET_KEY, {
        expiresIn: "1h",
      });

      res.setHeader(
        "Set-Cookie",
        serialize("authToken", token, {
          httpOnly: true,
          path: "/",
          maxAge: 3600,
        })
      );

      res.status(200).json({
        success: true,
        message: "Login successful",
        token,
        user,
      });
    } catch (error) {
      console.log(error);

      res.status(500).json({ message: "Login failed", error: error.message });
    }
  } else {
    res.status(405).json({ messgae: "Method not allowed" });
  }
}
