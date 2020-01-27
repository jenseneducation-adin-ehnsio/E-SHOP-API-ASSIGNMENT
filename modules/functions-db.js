// Imports
const lowdb = require("lowdb");
const FileSync = require("lowdb/adapters/FileSync");
const adapter = new FileSync("database.json");
const db = lowdb(adapter);

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
    .value();
};

// Adds the object "item"  to the "cart" array in database.json
const addToCart = async cartItem => {
  const itemStatus = await checkIfAdded(cartItem.id);

  if (!itemStatus) {
    // Adds product if not already in cart
    const pushtoCart = await db
      .get("cart")
      .push(cartItem)
      .write();

    return pushtoCart[pushtoCart.length - 1]; //returns the latest added item
  } else return null; // Returns null (nothing added)
};

// Checks if item is already in cart
async function checkIfAdded(id) {
  return await db
    .get("cart")
    .find({ id: id })
    .value();
}

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
