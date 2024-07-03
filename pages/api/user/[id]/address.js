import User from "@/lib/models/User";

export default async function handler(req, res) {
  if (req.method === "PUT") {
    const { id } = req.query;

    const addressData = req.body;
    const user = await User.findByIdAndUpdate(
      id,
      { $push: { address: addressData } },
      { new: true }
    );

    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }

    res
      .status(200)
      .json({ success: true, user, message: "Address added successfully" });
  } else {
    res
      .status(405)
      .json({ success: false, messgae: `Method ${req.method} not allowed` });
  }
}
