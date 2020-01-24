// Imports
const express = require("express");
const router = express.Router(); // Adds the router() module from express to const router
const {
  getProducts,
  getProduct,
  getCart,
  addToCart,
  removeFromCart
} = require("./functions-db"); // Imports functions from functions-db

//Endpoint "/" shows all the products with a get request
router.get("/products", async (req, res) => {
  const data = await getProducts();
  res.send(data);
});

//Endpoint "cart" shows all the cart-items with a get request
router.get("/cart", async (req, res) => {
  const data = await getCart();
  res.send(data);
});

//Endpoint "cart/add/:id" adds item to cart with a post request
router.post("/cart/add/:id", async (req, res) => {
  const item = await getProduct(req.params.id);

  //Checks if item exists and sends a 404 if not
  if (!item) {
    res.status(404).send("Product does not exist");
  } else {
    const addedItem = await addToCart(item);

    let message = {
      success: true,
      message: "Product added to cart",
      data: addedItem
    };

    res.send(message); // Sends the message-object as response
  }
});

//Endpoint "cart/remove/:id" removes item from cart with a delete request
router.delete("/cart/remove/:id", async (req, res) => {
  const deletedItem = await removeFromCart(req.params.id);

  //Checks if item was deleted and sends a 404 if not
  if (!deletedItem) {
    res.status(404).send("No such item in cart");
  } else {
    let message = {
      success: true,
      message: "Product removed from cart",
      data: deletedItem
    };

    res.send(message); // Sends the message-object as response
  }
});

module.exports = router; //Exports router module
