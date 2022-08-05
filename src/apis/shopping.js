import auth from "./middlewares/auth.js";
import {OrderService} from "../services/index.js";

export default (app) => {
    const orderService = new OrderService();

    app.post("/api/orders", auth, async (req, res) => {
        console.log(req.user);
        try {
            const order = await orderService.createOrder(req.user.id);
            res.send(order);
        } catch (error) {
            console.log(error);
            res.status(500).send(error);
        }
    });

}