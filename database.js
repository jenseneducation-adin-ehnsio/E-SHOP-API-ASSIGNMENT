const lowdb = require("lowdb");
const FileSync = require("lowdb/adapters/FileSync");
const adapter = new FileSync("database.json");
const db = lowdb(adapter);

const getProducts = async () => {
  return await db.get("products");
};

const getProduct = async id => {
  return await db
    .get("products")
    .find({ id: id })
    .value();
};

const getCart = async () => {
  return await db.get("cart");
};

const addToCart = async product => {
  return await db
    .get("cart")
    .push(product)
    .write();
};

const removeFromCart = async id => {
  return await db
    .get("cart")
    .remove({ id: id })
    .write();
};

module.exports = {
  getProducts,
  getProduct,
  getCart,
  addToCart,
  removeFromCart
};
