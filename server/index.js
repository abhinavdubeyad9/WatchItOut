const express = require("express");
require("dotenv").config();
const cors = require("cors");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const app = express();
const uri = process.env.MONGO_DB_URI;
const PORT = process.env.PORT || 5000;

const authRouter = require("./Routes/auth");
const productRouter = require("./Routes/product");
const orderRouter = require("./Routes/order");

app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
app.use(cors());

mongoose
  .connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() =>
    app.listen(PORT, () =>
      console.log(`Server Running on Port:${PORT}, mongodb connected`)
    )
  )
  .catch((error) => console.log(`${error} did not connect`));

// app.use(setUser);
app.use("/auth", authRouter);
app.use("/product", productRouter);
app.use("/order", orderRouter);

app.get("/", (req, res) => {
  res.send("home page");
});
