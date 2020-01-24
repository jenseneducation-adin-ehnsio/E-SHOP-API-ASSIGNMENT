// Imports
const lowdb = require("lowdb");
const FileSync = require("lowdb/adapters/FileSync");
const adapter = new FileSync("database.json");
const db = lowdb(adapter);
const shortid = require("shortid");

// Returns all objects from the array "products" in database.json
const getProducts = async () => {
  return await db.get("products");
};

// Returns all objects from the array "cart" in database.json
const getCart = async () => {
  return await db.get("cart");
};

// Returns the object with the requested id from the array "products" in database.json
const getProduct = async id => {
  return await db
    .get("products")
    .find({ id: id }) // Gets the product with the right id
    .cloneDeep() // Creates a clone of the object
    .value();
};

// Adds the object "item"  to the "cart" array in database.json
const addToCart = async cartItem => {
  cartItem.id = shortid.generate(); // Gives cart-item unique id
  const pushtoCart = await db
    .get("cart")
    .push(cartItem)
    .write();

  return cartItem; //returns the latest added item
};

// Removes all the objects with the requested id from database.json
const removeFromCart = async id => {
  const removeItem = await db
    .get("cart")
    .remove({ id: id })
    .write();

  return removeItem[0]; //Returns the removed item
};

module.exports = {
  getProducts,
  getProduct,
  getCart,
  addToCart,
  removeFromCart
}; // Exports all the functions that handles lowdb
