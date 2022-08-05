import {OrderRepository} from "../database/repository/index.js";
import {ProductService,CustomerService} from "../services/index.js";

export default class OrderService {
    
    constructor() {
        this.orderRepository = new OrderRepository();
        this.customerService = new CustomerService();
        this.productService = new ProductService();
    }

    async createOrder(id) {
        const customer = await this.customerService.getCustomerById(id,true);
        const cart = customer.cart;

        let amt = 0;
        for(let i = 0; i < cart.length; i++) {
            const product = await this.productService.getProductById(cart[i].product);
            amt += product.price * cart[i].units;
        }

        try {
            const newOrder = await this.orderRepository.createOrder({
                customerId: id,
                amount: amt,
                products: cart,
                status: "pending"
            });
            return newOrder;
        } catch (error) {
            console.log(error);
            throw error;          
        }
    }

}