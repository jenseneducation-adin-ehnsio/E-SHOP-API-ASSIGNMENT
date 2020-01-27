// Imports
const express = require("express");
const router = express.Router(); // Adds the router() module from express to const router
const db = require("./functions-db"); // Imports functions from functions-db

//Endpoint "/" shows all the products with a get request
router.get("/products", async (req, res) => {
  const data = await db.getProducts();
  let message = {
    success: true,
    message: "Products",
    data: data
  };
  res.send(message);
});

//Endpoint "cart" shows all the cart-items with a get request
router.get("/cart", async (req, res) => {
  const data = await db.getCart();
  let message = {
    success: true,
    message: "Cart items",
    data: data
  };
  res.send(message);
});

//Endpoint "cart/add/:id" adds item to cart with a post request
router.post("/cart/add/:id", async (req, res) => {
  const item = await db.getProduct(req.params.id); //Collects the product to be added

  //Checks if item exists and sends a 404 if not
  if (!item) {
    res.status(404).send("Product does not exist");
  } else {
    const addedItem = await db.addToCart(item);

    if (addedItem) {
      let message = {
        success: true,
        message: "Product added to cart",
        data: addedItem
      };
      res.send(message); // Sends message of product added
    } else {
      let message = {
        success: false,
        message: "Product already in cart",
        data: item
      };
      res.status(404).send(message); // Sends 404, item already in cart
    }
  }
});

//Endpoint "cart/remove/:id" removes item from cart with a delete request
router.delete("/cart/remove/:id", async (req, res) => {
  const deletedItem = await db.removeFromCart(req.params.id);

  //Checks if item was deleted and sends a 404 if not
  if (!deletedItem) {
    let message = {
      success: false,
      message: "No such product in your cart"
    };
    res.status(404).send(message);
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
