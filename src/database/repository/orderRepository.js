import {OrderModel, CustomerModel} from "../models/index.js";

export default class OrderRepository {
    async getOrderById(id) {}
    async getOrders() {}
    async createOrder({
        customerId,
        amount,
        products,
        status,
    }) {
        console.log("amount",amount)
        try {
            const newOrder = await OrderModel.create({
                customer: customerId,
                amount: amount,
                products: products,
                orderStatus: status,
                orederDate: new Date(),
            });

            //update customer orders
            await CustomerModel.findByIdAndUpdate(customerId, {
                id: customerId,
                $push: {
                    orders: newOrder._id,
                },
            });

            //empty cart
            await CustomerModel.findByIdAndUpdate(customerId, {
                id: customerId,
                $set: {
                    cart: [],
                },
            });

            
            return await (await newOrder.populate("customer")).populate("products.product");
        } catch (error) {
            console.log(error);
            throw error;
        }
    }
}