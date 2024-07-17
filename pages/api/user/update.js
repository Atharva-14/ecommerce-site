import User from "@/lib/models/User";

export default async function handler(req, res) {
  if (req.method === "PUT") {
    try {
      const { userId, firstName, lastName, email } = req.body;

      if (!userId || !firstName || !lastName || !email) {
        return res.status(400).json({ message: "Missing required fields" });
      }

      const user = await User.findByIdAndUpdate(
        userId,
        { firstName, lastName, email },
        { new: true, runValidators: true }
      );

      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }

      res.status(200).json({
        success: true,
        user,
        message: "Updated details successfully.",
      });
    } catch (error) {
      res.status(500).json({ success: false, message: error.message });
    }
  } else {
    res.status(405).json({ message: "Method not allowed" });
  }
}
