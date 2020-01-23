const lowdb = require("lowdb");
const FileSync = require("lowdb/adapters/FileSync");
const adapter = new FileSync("database.json");
const db = lowdb(adapter);

//ADDS ARRAY "PRODUCTS" and "CHECKOUT" IF NOT INITIATED, RUNS WHEN SERVER LOAD
const initiateDb = () => {
  const dbInitiated = db.has("products").value();
  if (!dbInitiated) {
    db.defaults({ products: [], cart: [] }).write();
  }
};

module.exports = initiateDb;
