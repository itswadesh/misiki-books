import { gateway as MoltinGateway } from "@moltin/sdk";
require("dotenv").config();
const { MOLTIN_CLIENT_ID } = process.env;
const Moltin = MoltinGateway({
  client_id: MOLTIN_CLIENT_ID
});

export default {
  getHomepageProducts() {
    return Moltin.Products.Filter({})
      .With("main_image")
      .Limit(8)
      .All();
  },

  findBySlug(slug) {
    return Moltin.Products.Filter({
      eq: {
        slug: slug
      }
    })
      .With(["main_image", "brands"])
      .Limit(1)
      .All();
  },

  getCart() {
    return Moltin.Cart().Items();
  },

  addToCart(productId, qty) {
    return Moltin.Cart().AddProduct(productId, qty);
  },

  updateCart(productId, qty) {
    return Moltin.Cart().UpdateItemQuantity(productId, qty);
  },

  removeFromCart(itemId) {
    return Moltin.Cart().RemoveItem(itemId);
  },

  deleteCart() {
    return Moltin.Cart().Delete();
  },

  checkout(customerId, billing, shipping) {
    return Moltin.Cart().Checkout(customerId, billing, shipping);
  },

  pay(orderId, paymentData) {
    return Moltin.Orders.Payment(orderId, paymentData);
  },

  order(orderId) {
    return Moltin.Orders.With("items").Get(orderId);
  }
};
