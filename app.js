const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");

const productsRouter = require("./routes/products");
const usersRouter = require("./routes/users");
const authRouter = require("./routes/auth");
const cartRouter = require("./routes/cart");
const orderRouter = require('./routes/orders');

const initiateDBConnection = require("./config/db");
dotenv.config({
  path: "./config/.env",
});

const PORT = process.env.PORT;
const app = express();
app.use(cors());
app.use(express.json());

app.use("/products", productsRouter);
app.use("/users", usersRouter);
app.use("/auth", authRouter);
app.use("/cart", cartRouter);
app.use('/orders', orderRouter);
app.use('/uploads', express.static('uploads'));


app.listen(PORT, async () => {
  console.log(`Server is running on port ${PORT}`);

  await initiateDBConnection();
});
