const { default: mongoose } = require("mongoose");

const addressSchema = new mongoose.Schema(
  {
    fullName: {
      type: String,
      required: true,
    },
    line1: {
      type: String,
      required: true,
    },
    line2: {
      type: String,
    },
    city: {
      type: String,
      required: true,
    },
    state: {
      type: String,
      required: true,
    },
    pincode: {
      type: String,
      required: true,
    },
    country: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
    },
    email: {
      type: String,
    },
    type: {
      type: String,
      enum: ["home", "work"],
      default: "home",
    },
  },
  {
    _id: false, // Disable automatic creation of `_id` for subdocuments
  }
);

const userSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    address: {
      type: [addressSchema],
      default: [],
    },
  },
  {
    timestamps: true,
  }
);

const User = mongoose.models.User || mongoose.model("User", userSchema);

export default User;
