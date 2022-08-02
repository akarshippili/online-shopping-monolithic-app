import { CustomerService } from '../services/index.js';
import auth from './middlewares/auth.js';
export default (app) => {

    const customerService = new CustomerService();

    app.post("/api/customers/login", async (req, res) => {
        try {
            const { email, password } = req.body;
            const data = await customerService.loginCustomer(email, password);
            res.send(data);
        } catch (error) {
            console.log(error);
            res.status(500).send(error);
        }
    });
    
    app.post("/api/customers/register", async (req, res) => {
        const { email, password } = req.body;
        console.log(email, password);
        try {
            const customer = await customerService.registerCustomer(email, password);
            res.json(customer);
        } catch (error) {
            console.log(error);
            res.status(500).json(error);
        }
    });

    app.get("/api/customers/whoami", auth, async (req, res) => {
        const id = req.user.id;
        try {
            const customer = await customerService.getCustomerById(id);
            res.status(200).json(customer);
        } catch(error) {
            console.log(error);
            res.status(500).send(error);
        }
    });

    app.put("/api/customers/update-address", auth, async (req, res) => {
        const id = req.user.id;
        const { street, city, state, zip, country } = req.body;
        const address = { street, city, state, zip, country };
        console.log("in customer controller",address);
        try {
            const customer = await customerService.updateAddress(id, address);
            res.status(200).json(customer);
        } catch(error) {
            console.log(error);
            res.status(500).send(error);
        }
    });
};