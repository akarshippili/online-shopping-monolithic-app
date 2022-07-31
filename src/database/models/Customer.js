import mongoose from "mongoose";

const CustomerSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    salt: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
      required: false,
    },
    address: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "address",
      required: false,
    },
    cart: [
      {
        product: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "product",
          required: true,
        },
        units: { type: Number, required: true },
      },
    ],
    wishlist: [
      { type: mongoose.Schema.Types.ObjectId, ref: "product", required: true },
    ],
    orders: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "order",
        required: true
      },
    ],
  },
  {
    timestamps: true,
    toJSON: {
      transform: (doc, ret) => {
        delete ret.password;
        delete ret.salt;
        delete ret.__v;
      },
    },
  }
);

export default mongoose.model("customer", CustomerSchema);