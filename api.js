var express = require("express");
var router = express.Router();
const lowdb = require("lowdb");
const FileSync = require("lowdb/adapters/FileSync");
const adapter = new FileSync("database.json");
const db = lowdb(adapter);

router.get("/", async (req, res) => {
  const data = await getProducts();
  res.send(data);
});

router.post("/addtocart/:id", async (req, res) => {
  const product = await getProduct(req.params.id);
  const addedToCart = await addToCart(product);

  let message = {
    success: true,
    message: "Product added to cart"
  };

  message.data = addedToCart[addedToCart.length - 1];
  res.send(message);
});

const getProducts = async () => {
  return await db.get("products");
};

const getProduct = async id => {
  return await db.get(`products[${id}]`);
};

const addToCart = async product => {
  const cartItem = await db
    .get("cart")
    .push(product)
    .write();
  return cartItem;
};

module.exports = router;
