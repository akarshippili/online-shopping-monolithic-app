import { CustomerRepository } from "../database/repository/index.js";
import {
  generateSalt,
  comparePassword,
  hashPassword,
  generateToken,
} from "../utils/index.js";
import { ProductService } from "../services/index.js";

export default class CustomerService {
  constructor() {
    this.customerRepository = new CustomerRepository();
    this.productService = new ProductService();
  }

  async getAllCustomers() {}

  async getCustomerById(id) {
    try {
      const customer = await this.customerRepository.getCustomerById(id);
      if (!customer) {
        throw new Error("Customer does not exist");
      }
      return customer;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  async getCustomerByEmail() {
    try {
      const customer = await this.customerRepository.getCustomerByEmail(email);
      if (!customer) {
        throw new Error("Customer does not exist");
      }
      return customer;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }
  async registerCustomer(email, password, phone = null) {
    try {
      const customer = await this.customerRepository.getCustomerByEmail(email);
      if (customer) {
        throw new Error("Customer already exists");
      }

      const salt = await generateSalt();
      const hashedPassword = await hashPassword(password, salt);

      const newCustomer = await this.customerRepository.registerCustomer({
        email,
        password: hashedPassword,
        salt,
        phone,
        address: null,
        cart: [],
        wishlist: [],
        orders: [],
      });
      return newCustomer;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  async loginCustomer(email, password) {
    try {
      const customer = await this.customerRepository.getCustomerByEmail(email);
      if (!customer) {
        throw new Error("Customer does not exist");
      }
      const isValid = await comparePassword(password, customer.password);
      if (!isValid) {
        throw new Error("Invalid password");
      }
      const token = generateToken({
        id: customer.id,
      });
      return { token };
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  async updateAddress(id, address) {
    try {
      const customer = await this.customerRepository.getCustomerById(id);
      if (!customer) {
        throw new Error("Customer does not exist");
      }
      const updatedCustomer = await this.customerRepository.updateAddress(
        id,
        address
      );
      return updatedCustomer;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  async addToWishlist(customerId, product) {
    try {
      const customerWishlist = await this.customerRepository.getWishlist(customerId);
      if (customerWishlist.includes(product._id)) {
        throw new Error("Product already in wishlist");
      }
      return await this.customerRepository.addToWishlist(customerId, product);
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  async getWishlist(customerId) {
    try {
      return await this.customerRepository.getWishlist(customerId);
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  async deleteFromWishlist(customerId, product) {
    try {
      const customerWishlist = await this.customerRepository.getWishlist(customerId);
      if (!customerWishlist || !customerWishlist.includes(product._id)) {
        throw new Error("Product not in wishlist");
      }
      return await this.customerRepository.deleteFromWishlist(customerId, product);
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  async addToCart(customerId, product, quantity) {
    try {
      if(!quantity) {
        quantity = 1;
      }
      return await this.customerRepository.addToCart(customerId, product, quantity);
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  async getCart(customerId) {
    try {
      return await this.customerRepository.getCart(customerId);
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  async deleteFromCart(customerId, product) {
    try {
      const customerCart = await this.customerRepository.getCart(customerId);
      const productIndex = customerCart.findIndex(item => item.product.toString() === product._id.toString());
      if (productIndex === -1) {
        throw new Error("Product not in cart");
      }

      return await this.customerRepository.deleteFromCart(customerId, product);
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

}
