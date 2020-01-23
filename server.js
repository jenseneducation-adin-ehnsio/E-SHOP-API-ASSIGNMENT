// MODULES AND VARIABLES
const express = require("express");
const app = express();
const port = process.env.PORT || 7000;
let api = require("./api");
const initiateDb = require("./initiateDb");

app.use("/", api); // Route from api.js

// LISTENS AT PORT 7000 AND INITIATES DATABASES
app.listen(port, () => {
  console.log("Server started on port: ", port);
  initiateDb(); // INITIATE DB
});
