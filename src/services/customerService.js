import { CustomerRepository } from "../database/repository/index.js";
import {
  generateSalt,
  comparePassword,
  hashPassword,
  generateToken,
} from "../utils/index.js";

export default class CustomerService {
  constructor() {
    this.customerRepository = new CustomerRepository();
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
}
