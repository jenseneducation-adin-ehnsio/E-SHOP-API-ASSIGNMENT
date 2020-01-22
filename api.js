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

const getProducts = async () => {
  return await db.get("products");
};

router.post("/addtocart/:id", async (request, response) => {
  const productId = request.params.id;

  let message = {
    success: true,
    message: "Product added"
  };

  const addedProduct = await addProduct(productId);
  message.data = addedProduct[res.length - 1];
  res.send(message);
});

module.exports = router;
