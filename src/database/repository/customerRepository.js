import { CustomerModel } from "../models/index.js";

export default class CustomerRepository {

  async getCustomerByEmail(email) {
    try {
      const customer = await CustomerModel.findOne({ email });
      return customer;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  async getCustomerById(id) {
    try {
      const customer = await CustomerModel.findById(id);
      return customer;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  async registerCustomer({
    email,
    password,
    salt,
    phone = null,
    address = null,
    cart = [],
    wishlist = [],
    orders = [],
  }) {
    try {
      const customer = new CustomerModel({
        email,
        password,
        salt,
        phone,
        address,
        cart,
        wishlist,
        orders,
      });
      await customer.save();
      return customer;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

}
