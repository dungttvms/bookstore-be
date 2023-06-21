//Add thư viện dotenv
require("dotenv").config();
const cors = require("cors");

// tạo biến cors từ thư viện cors
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");

var indexRouter = require("./routes/index");

var app = express();

//Thêm router cors
app.use(cors());
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/", indexRouter);
//handle error
//1. catch khi request not match voi bat ky route nao
app.use((req, res, next) => {
  const exception = new Error(`Path not Found`);
  exception.statusCode = 404;
  next(exception);
});

//2. Customizie errors nhan  ve
// app.use((err, req, res, next) => {
//   res.status(err.statusCode).send(err.message);
// });

module.exports = app;
