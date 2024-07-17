import User from "@/lib/models/User";

export default async function handler(req, res) {
  if (req.method === "POST") {
    const { id } = req.query;
    const { addressId } = req.body;

    if (!id || !addressId) {
      return res.status(400).json({
        success: false,
        message: "User ID and Address ID are required",
      });
    }

    try {
      const user = await User.findById(id);

      if (!user) {
        return res
          .status(404)
          .json({ success: false, message: "User not found" });
      }

      user.address = user.address.filter(
        (address) => address._id.toString() !== addressId
      );

      await user.save();

      res.status(200).json({
        success: true,
        user,
        message: "Address deleted successfully.",
      });
    } catch (error) {
      res.status(500).json({ success: false, message: error.message });
    }
  }
}
