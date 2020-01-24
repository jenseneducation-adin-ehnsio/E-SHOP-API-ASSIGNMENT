// Imports
const express = require("express");
const app = express();
const port = process.env.PORT || 7000;
let router = require("./api/router");
const initDatabase = require("./api/init-db");

app.use("/", router); // Uses endpoints from router.js

// LISTENS AT PORT 7000 AND INITIATES DATABASES
app.listen(port, () => {
  console.log("Server started on port: ", port);
  initDatabase(); // INITIATE database.json if it does not exist
});
