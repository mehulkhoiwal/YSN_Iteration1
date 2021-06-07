const express = require("express");
const app = express();
const dbConnection = require("./database/dbConnection");
const router = express.Router();
const userDao = require("./daos/userDao");
// import { jwtAuthenticationMiddleware } from "./auth";
// const jwtAuthenticationMiddleware = require("./auth");

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
require("dotenv").config;

const cors = require("cors");
const corsOptions = {
  origin: "http://localhost:3000",
};

app.use(cors(corsOptions));
// app.use(jwtAuthenticationMiddleware);

dbConnection.connect().then((connectionStatus) => {
  //replace consoles with logging
  if (connectionStatus) console.log("Connection established successfully");
  else {
    console.log("Some problem please check logs for further information");
    //exiting application with status code 0 because database connection failed
    process.exit(0);
  }

  //userDao.addUser()
});

app.use("/api/v1", router);
require("./routes/routes")(router);


app.use((err, req, res, next) => {
  if (err && err.error && err.error.isJoi) {
      console.log(err.error.details[0].message);
      let errStr = err.error.toString();
      errStr = errStr.replace(/"/g, '');
      if (errStr.includes('ValidationError')) {
          res.status(400).json({
              responseCode: 1000,
              debugMessage: errStr,
              message: 'BAD_REQUEST',
          });
      } else {
          res.status(200).json({
              responseCode: 1000,
              debugMessage: errStr,
              message: errStr,
          });
      }
  } else {
  // pass on to another error handler
      next(err);
  }
});

app.listen((port = process.env.PORT));
