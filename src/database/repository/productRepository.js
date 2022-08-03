import { ProductModel } from "../models/index.js";

export default class ProductRepository{

    async createProduct(product){
        try {
            const productModel = new ProductModel(product);
            const newProduct = await productModel.save();
            return newProduct;
        } catch (error) {
            console.log(error);
            throw error;
        }
    }

    async getProductById(id){
        try {
            const product = await ProductModel.findById(id);
            return product;
        } catch (error) {
            console.log(error);
            throw error;
        }
    }

    async getProductsByCategory(category){
        try {
            const products = await ProductModel.find({category: category});
            return products;
        } catch (error) {
            console.log(error);
            throw error;
        }
    }
}