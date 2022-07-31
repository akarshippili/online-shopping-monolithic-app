import mongoose from "mongoose";

const OrderSchema = new mongoose.Schema({
    orederDate: {
        type: Date,
    },
    orderStatus: {
        type: String,
        required: true
    },
    customer: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "customer",
        required: true
    },
    amount: {
        type: Number,
        required: true
    },
    products: [
        {
            product: { type: mongoose.Schema.Types.ObjectId, ref: "product", required: true },
            units: { type: Number, required: true }
        }
    ]
},{
    toJSON: {
        transform: (doc, ret) => {
            ret.id = ret._id;
            delete ret._id;
        }
    },
    timestamps: true
});


export default mongoose.model("order", OrderSchema);