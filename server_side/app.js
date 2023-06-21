const express = require("express");
const app = express();
const cors = require("cors");
const dotenv = require("dotenv");

dotenv.config({ path: "./config.env" });
const port = process.env.PORT;

app.use(cors());
app.use(express.json());
app.use(require("./router/auth"));
app.listen(port, () => {
  console.log(`server running at ${port}`);
});
