import User from "@/lib/models/User";

export default async function handler(req, res) {
  if (req.method === "PUT") {
    const { id } = req.query;

    const { addressId, data } = req.body;

    try {
      const updatedUser = await User.findOneAndUpdate(
        { _id: id, "address._id": addressId },
        {
          $set: {
            "address.$": { _id: addressId, ...data },
          },
        },
        { new: true, runValidators: true }
      );

      if (!updatedUser) {
        return res
          .status(404)
          .json({ success: false, message: "User or address not found" });
      }

      res.status(200).json({
        success: true,
        user: updatedUser,
        message: "Address updated successfully",
      });
    } catch (error) {
      res.status(400).json({ success: false, message: error.message });
    }
  } else {
    res
      .status(405)
      .json({ success: false, messgae: `Method ${req.method} not allowed` });
  }
}
