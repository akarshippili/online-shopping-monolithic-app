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

  async getCustomerById(id,populate = true ) {
    try {

      if(!populate) {
        return this.getCustomerById(id);
      }

      const customer = await CustomerModel.findById(id).populate("cart.product").populate("wishlist.product");
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

  async addToCart(id, product, quantity=1) {
    try {
      // if product is already in cart, increase quantity 
      // else add product to cart
      const customer = await CustomerModel.findById(id).populate("cart.product");
      const cart = customer.cart;
      const productIndex = cart.findIndex(item => item.product._id.toString() === product._id.toString());
      if (productIndex !== -1) {
        cart[productIndex].units += quantity;
      } else {
        cart.push({ product, units: quantity });
      }

      const updatedCustomer = await CustomerModel.findByIdAndUpdate(
        id,
        { cart },
        { new: true }
      );

      return updatedCustomer.cart;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  async getCart(id) {
    try {
      const customer = await CustomerModel.findById(id).populate("cart");
      return customer.cart;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  async deleteFromCart(id, product) {
    try {
      const customer = await CustomerModel.findByIdAndUpdate(
        id,
        { $pull: { cart: { product: product._id } } },
        { new: true }
      );
      return customer.cart;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }
}
