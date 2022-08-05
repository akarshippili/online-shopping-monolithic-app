import {OrderModel, CustomerModel, ProductModel} from "../models/index.js";

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

            products.forEach(async (item, index) => {
                await ProductModel.findByIdAndUpdate(
                    item.product._id, 
                    {
                        units: item.product.units - products[index].units,
                    }
                );
            });
            
            return await (await newOrder.populate("customer")).populate("products.product");
        } catch (error) {
            console.log(error);
            throw error;
        }
    }
}