// Imports
const express = require("express");
const app = express();
let routes = require("./modules/routes");
const db = require("./modules/init-db");
const port = process.env.PORT || 7000;

app.use("/", routes); // Uses endpoints from routes.js

// LISTENS AT PORT 7000 AND INITIATES DATABASES
app.listen(port, () => {
  console.log("Server started on port: ", port);
  db.initDatabase(); // INITIATE database.json if it does not exist
});