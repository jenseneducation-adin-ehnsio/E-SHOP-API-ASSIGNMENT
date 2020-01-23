const express = require("express");
const router = express.Router();
const {
  getProducts,
  getProduct,
  getCart,
  addToCart,
  removeFromCart
} = require("./database");

router.get("/", async (req, res) => {
  const data = await getProducts();
  res.send(data);
});

router.get("/cart", async (req, res) => {
  const data = await getCart();
  res.send(data);
});

router
  .route("/cart/:id")
  .post(async (req, res) => {
    const product = await getProduct(req.params.id);

    if (!product) {
      res.send("Product does not exist");
    } else {
      await addToCart(product);

      let message = {
        success: true,
        message: "Product added to cart",
        data: product
      };

      res.send(message);
    }
  })
  .delete(async (req, res) => {
    const deletedItem = await removeFromCart(req.params.id);

    if (deletedItem.length == 0) {
      res.send("No such item in your cart");
    } else {
      let message = {
        success: true,
        message: "Product removed from cart",
        data: deletedItem
      };

      res.send(message);
    }
  });

module.exports = router;
