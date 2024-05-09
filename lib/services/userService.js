import connectDB from "@/utils/db";
import User from "../models/User";

export async function createUser(userData) {
  await connectDB();
  try {
    const user = new User(userData);
    await user.save();
    return user;
  } catch (error) {
    throw new Error("Failed to create user: ", error.message);
  }
}
