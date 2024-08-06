const { default: mongoose } = require("mongoose");
const { ObjectId } = require("mongodb");
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
      enum: ["Home", "Work", "Office"],
      default: "Home",
    },
  },
  {
    _id: true, // Enable automatic creation of `_id` for subdocuments
  }
);

const orderSchema = new mongoose.Schema({
  item: [
    {
      bookId: {
        type: ObjectId,
        required: true,
      },
      quantity: {
        type: Number,
        required: true,
      },
    },
  ],
  totalAmount: {
    type: Number,
    required: true,
  },
  orderDate: {
    type: Date,
    default: Date.now,
  },
  address: addressSchema,
  paymentMethod: {
    type: String,
    required: true,
  },
});

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
    pastOrders: {
      type: [orderSchema],
      default: [],
    },
  },
  {
    timestamps: true,
  }
);

const User = mongoose.models?.User || mongoose.model("User", userSchema);

export default User;
