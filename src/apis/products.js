import auth from "./middlewares/auth.js";
import { CustomerService, ProductService } from "../services/index.js";

export default (app) => {
    const productService = new ProductService();
    const customerService = new CustomerService();

    // create
    app.post("/api/products", async (req, res) => {
        try {
            const product = await productService.createProduct(req.body);
            res.send(product);
        } catch (error) {
            console.log(error);
            res.status(500).send(error);
        }
    });

    app.post("/api/products/create-many", async (req, res) => {
        try {
            const products = await productService.createProducts(req.body);
            res.send(products);
        } catch (error) {
            console.log(error);
            res.status(500).send(error);
        }
    });

    //get products by category
    app.get("/api/products/category/:category", async (req, res) => {
        try {
            const products = await productService.getProductsByCategory(req.params.category);
            res.send(products);
        } catch (error) {
            console.log(error);
            res.status(500).send(error);
        }
    });

    app.get("/api/products/:id", async (req, res) => {
        try {
            const product = await productService.getProductById(req.params.id);
            res.send(product);
        } catch (error) {
            console.log(error);
            res.status(400).send({
                message: error.message,
            });
        }
    });
    
    app.put("/api/products/:id", async (req, res) => {
        try {
            const product = await productService.updateProduct(req.params.id, req.body);
            res.send(product);
        } catch (error) {
            console.log(error);
            res.status(500).send(error);
        }
    });

    app.delete("/api/products/:id", async (req, res) => {
        try {
            const product = await productService.deleteProduct(req.params.id);
            res.send(product);
        } catch (error) {
            console.log(error);
            res.status(500).send(error);
        }
    });

    app.post("/api/wishlist", auth, async (req, res) => {
        try {
            const id = req.user.id;
            const product = await productService.getProductById(req.body.productId);
            const updatedWishlist = await customerService.addToWishlist(id, product);
            res.send(updatedWishlist);
        } catch (error) {
            console.log(error);
            res.status(400).json({
                message: error.message
            });
        }
    });

    app.get("/api/wishlist", auth, async (req, res) => {
        try {
            const wishlist = await customerService.getWishlist(req.user.id);
            res.send(wishlist);
        } catch (error) {
            console.log(error);
            res.status(500).send(error);
        }
    });

    app.delete("/api/wishlist", auth, async (req, res) => {
        try {
            const id = req.user.id;
            const product = await productService.getProductById(req.body.productId);
            const wishlist = await customerService.deleteFromWishlist(id, product);
            res.send(wishlist);
        } catch (error) {
            console.log(error);
            res.status(400).send({
                message: error.message
            });
        }
    });

    app.post("/api/cart", auth, async (req, res) => {
        try {
            const id = req.user.id;
            const product = await productService.getProductById(req.body.productId);
            const quantity = req.body.quantity || 1;
            const updatedCart = await customerService.addToCart(id, product, quantity);
            res.send(updatedCart);
        } catch (error) {
            console.log(error);
            res.status(400).json({
                message: error.message
            });
        }
    });

    app.get("/api/cart", auth, async (req, res) => {
        try {
            const cart = await customerService.getCart(req.user.id);
            res.send(cart);
        } catch (error) {
            console.log(error);
            res.status(500).send({
                message: error.message
            });
        }
    });

    app.delete("/api/cart", auth, async (req, res) => {
        try {
            const id = req.user.id;
            const product = await productService.getProductById(req.body.productId);
            const cart = await customerService.deleteFromCart(id, product);
            res.send(cart);
        } catch (error) {
            console.log(error);
            res.status(400).send({
                message: error.message
            });
        }
    });
}