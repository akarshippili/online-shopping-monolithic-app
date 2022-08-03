import { CustomerModel, AddressModel } from "../models/index.js";

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

  async updateAddress(id, address) {
    try {
      const addressModel = new AddressModel({
        street: address.street,
        city: address.city,
        state: address.state,
        zip: address.zip,
        country: address.country,
      });
      const savedAdderess = await addressModel.save();
      const customer = await CustomerModel.findByIdAndUpdate(
        id,
        { address: savedAdderess },
        { new: true }
      );
      return customer;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  async addToWishlist(id, product) {
    try {
      const customer = await CustomerModel.findByIdAndUpdate(
        id,
        { $push: { wishlist: product } },
        { new: true }
      );
      return customer.wishlist;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  async getWishlist(id) {
    try {
      const customer = await CustomerModel.findById(id).populate("wishlist");
      return customer.wishlist;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  async deleteFromWishlist(id, product) {
    try {
      const customer = await CustomerModel.deleteOne({ _id: id, wishlist: product });
      return customer.wishlist;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

}
