// Imports
const lowdb = require("lowdb");
const FileSync = require("lowdb/adapters/FileSync");
const adapter = new FileSync("database.json");
const db = lowdb(adapter);

//ADDS ARRAY "PRODUCTS" and "CHECKOUT" IF NOT INITIATED, RUNS WHEN SERVER LOAD
exports.initDatabase = () => {
  const dbInitiated = db.has("products").value();
  if (!dbInitiated) {
    db.defaults({ products: [], cart: [] }).write();
    console.log("database initiated");
  }
};
