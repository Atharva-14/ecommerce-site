import jwt from "jsonwebtoken";
import {
  createUser,
  findUserByEmail,
  validateUserPassword,
} from "../services/userService";
import { serialize } from "cookie";

export const createUserHandler = async (req, res) => {
  const { firstName, lastName, email, password } = req.body;
  try {
    const exisitingUser = await findUserByEmail(email);

    if (exisitingUser) {
      return res
        .status(400)
        .json({ message: "User with this email already exists" });
    }

    const user = await createUser({ firstName, lastName, email, password });

    res.status(200).json({ user });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to create user", error: error.message });
  }
};

export const loginUserHandler = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await findUserByEmail(email);

    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }

    const isPasswordValid = await validateUserPassword(user, password);
    if (!isPasswordValid) {
      return res.status(400).json({ message: "Invalid Password" });
    }

    const token = jwt.sign({ userId: user._id }, process.env.SECRET_KEY, {
      expiresIn: "1h",
    });

    res.setHeader(
      "Set-Cookie",
      serialize("token", token, { httpOnly: true, path: "/", maxAge: 3600 })
    );
    res.status(200).json({ message: "Login successful" });
  } catch (error) {
    res.status(500).json({ message: "Login failed", error: error.message });
  }
};

export const logoutUserHandler = async (req, res) => {
  res.setHeader(
    "Set-Cookie",
    serialize("token", "", { httpOnly: true, path: "/", maxAge: -1 })
  );
  res.status(200).json({ message: "Logout successful" });
};
