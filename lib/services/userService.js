import connectDB from "@/utils/db";
import User from "../models/User";
import bcrypt from "bcrypt";

export const createUser = async (userData) => {
  await connectDB();

  const { firstName, lastName, email, password } = userData;
  const hashPassword = await bcrypt.hash(password, 10);

  const user = new User({
    firstName,
    lastName,
    email,
    password: hashPassword,
  });

  try {
    await user.save();
    return user;
  } catch (error) {
    throw new Error("Failed to create user: ", error.message);
  }
};

export const findUserByEmail = async (email) => {
  try {
    return await User.findOne({ email });
  } catch (error) {
    throw new Error("Failed to find user: ", error.message);
  }
};

export const validateUserPassword = async (user, password) => {
  return bcrypt.compare(password, user.password);
};
