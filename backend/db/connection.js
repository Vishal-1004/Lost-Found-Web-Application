const mongoose = require("mongoose");

//const DB = process.env.DATABASE;
const DB =
  "mongodb+srv://admin1:admin1@cluster0.05x7ye5.mongodb.net/?appName=Cluster0";

mongoose
  .connect(DB)
  .then(() => console.log("Database Connected"))
  .catch((error) => {
    console.log("error", error);
  });
