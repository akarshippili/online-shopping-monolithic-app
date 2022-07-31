import config from "../config/index.js";
import { CustomerRepository } from "../database/repository/index.js";
import { generateSalt, comparePassword, hashPassword } from "../utils/index.js";
import jsonwebtoken from "jsonwebtoken";

export class CustomerService {
  constructor() {
    this.customerRepository = new CustomerRepository();
  }

  async getAllCustomers() {}
  async getCustomerById() {}
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
      const token = jsonwebtoken.sign({ id: customer._id }, config.secret,  {
        expiresIn: config.jwtExpiration,
      });
      return { token };
    } catch (error) {
      console.log(error);
      throw error;
    }
  }
}
