require("dotenv").config();

// connecting with database
require("./db/connection");

const router = require("./routers/router");

const express = require("express");
const app = express();

const cors = require("cors");

const PORT = process.env.PORT || 4002;

app.use(express.json());
app.use(cors());

// Useing routes
app.use(router);

app.listen(PORT, () => {
  console.log(`Server start at Port No : http://localhost:${PORT}`);
});
