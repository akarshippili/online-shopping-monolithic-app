import { CustomerService } from '../services/customerService.js';

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
};