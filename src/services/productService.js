import { ProductRepository } from "../database/repository/index.js";
export default class ProductService {

    constructor() {
        this.productRepository = new ProductRepository();
    }

    async createProduct(product) {
        try {
            const newProduct = await this.productRepository.createProduct(product);
            return newProduct;
        } catch (error) {
            console.log(error);
            throw error;
        }
    }

    async createProducts(products) {
        try {
            let savedProducts = products.map(async (product) => this.productRepository.createProduct(product));
            let reponseData = await Promise.all(savedProducts);
            return reponseData;
        } catch (error) {
            console.log(error);
            throw error;
        }
    }

    async getProductById(id) {
        try {
            const product = await this.productRepository.getProductById(id);
            if(!product) {
                throw new Error("Product does not exist");
            }
            return product;
        } catch (error) {
            console.log(error);
            throw error;
        }
    }

    async getProductsByCategory(category) {
        try {
            const products = await this.productRepository.getProductsByCategory(category);
            return products;
        } catch (error) {
            console.log(error);
            throw error;
        }
    }

}