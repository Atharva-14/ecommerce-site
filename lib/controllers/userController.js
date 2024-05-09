import User from "../models/User";
import { createUser } from "../services/userService";

export async function createUserHandler(req, res) {
  const { firstName, lastName, email, password } = req.body;
  try {
    const exisitingUser = await User.findOne({ email });
    if (exisitingUser) {
      return res
        .status(400)
        .json({ message: "User with this email already exists" });
    }

    const user = await createUser({ firstName, lastName, email, password });
    res.status(201).json({ user });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to create user", error: error.message });
  }
}
