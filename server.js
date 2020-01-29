// Imports
const express = require("express");
const app = express();
const endpoints = require("./modules/api-endpoints");
const db = require("./modules/init-db");
const port = process.env.PORT || 7000;

app.use("/", endpoints); // Uses endpoints from endpoints.js

// LISTENS AT PORT 7000 AND INITIATES DATABASES
app.listen(port, () => {
  console.log("Server started on port: ", port);
  db.initDatabase(); // INITIATE database.json if it does not exist
});
