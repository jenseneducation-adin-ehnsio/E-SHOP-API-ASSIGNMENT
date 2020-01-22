// MODULES AND VARIABLES
const express = require("express");
const lowdb = require("lowdb");
const app = express();
const FileSync = require("lowdb/adapters/FileSync");
const adapter = new FileSync("database.json");
const db = lowdb(adapter);
const port = process.env.PORT || 7000;
let api = require("./api");

//ADDS ARRAY "PRODUCTS" and "CHECKOUT" IF NOT INITIATED, RUNS WHEN SERVER LOAD
const initiateDb = () => {
  const dbInitiated = db.has("products").value();
  if (!dbInitiated) {
    db.defaults({ products: [], cart: [] }).write();
  }
};

app.use("/store", api); // Route from api.js

// LISTENS AT PORT 7000 AND INITIATES DATABASES
app.listen(port, () => {
  console.log("Server started on port: ", port);
  initiateDb(); // INITIATE DB
});
