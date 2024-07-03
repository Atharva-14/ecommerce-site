import { parse } from "cookie";
import jwt from "jsonwebtoken";

export default function checkAuth(req, res) {
  const cookies = parse(req.headers.cookie || "");
  const token = cookies.authToken;

  if (!token) {
    return { isAuth: false };
  }

  try {
    const decoded = jwt.verify(token, process.env.SECRET_KEY);
    return {
      isAuth: true,
      user: decoded,
    };
  } catch (error) {
    return { isAuth: false };
  }
}
