const express = require("express");
const cors = require("cors");
const app = express();
const dotenv = require("dotenv");
dotenv.config();
const mongoose = require("mongoose");
const user = require("./routes/user");
const cart = require("./routes/cart");
const cookieParser = require("cookie-parser");

app.use(express.json());
app.use(cookieParser());

app.use(
  cors({
    origin: "*",
  })
);
mongoose
  .connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(console.log("CONNECTED WITH DATABASE"))
  .catch((error) => {
    console.log("DATABASE CONNECTION ISSUES");
    console.log(error);
    process.exit(1);
  });

app.use("/api/v1", user);
app.use("/api/v1", cart);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log("Backend is running.");
});
