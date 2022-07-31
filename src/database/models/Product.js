import mongoose from 'mongoose';
const { Schema } = mongoose;

const ProductSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    image: {   
        type: String,
        required: true
    },
    category: {
        type: String,
        required: true
    },
    units: {
        type: Number,
        required: true
    }
},{
    timestamps: true
});


export default mongoose.model("product", ProductSchema);