const env = require("dotenv");
const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const pid = process.pid;

//enable config
env.config();

const app = express();

//middleware
app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true
  })
);
app.use(function (req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
  res.setHeader('Access-Control-Allow-Credentials', true);
  next();
});

//process variables
const port = process.env.PORT || 8080;
const password = process.env.DB_PASSWORD;
const user = process.env.DB_USER;

//database
mongoose.connect(
  `mongodb+srv://${user}:${password}@cluster0-y8wr4.azure.mongodb.net/olympia?retryWrites=true`, {
    useNewUrlParser: true
  }
);

//routers
const productRouter = require("./routers/products.router");
const crowdfundingRouter = require("./routers/crowdfunding.router");
const userRouter = require("./routers/user.router");
const newsRouter = require("./routers/news.router");
const sportRouter = require("./routers/sport.router");
const trainingRouter = require("./routers/training.router");
const adwareRouter = require("./routers/adware.router");
app.use("/", sportRouter);
app.use("/", productRouter);
app.use("/", crowdfundingRouter);
app.use("/", userRouter);
app.use("/", newsRouter);
app.use("/", trainingRouter);
app.use("/", adwareRouter);

const server = app.listen(port, () => {
  console.log(`PID = ${pid}`);
});

process.on("SIGINT", () => {
  mongoose.disconnect();
  server.close();
});

process.on("SIGTERM", () => {
  mongoose.disconnect();
  server.close();
});

process.on("exit", () => {
  mongoose.disconnect();
  server.close();
});

module.exports = app;