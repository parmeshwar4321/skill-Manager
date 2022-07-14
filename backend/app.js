require("./config/dbConfig");
require("dotenv").config();
require("express-async-errors");

const cors = require("cors");
const morgan = require("morgan");
const express = require("express");
const PORT = process.env.PORT || 3000;

//routes
const userRouters = require("./user/user.router");
const leadsRouters = require("./skills/skills.router");
const middleware = require("./utils/middleware");

const app = express();

//middlewears
app.use(cors());
app.use(express.json());
app.use(morgan("dev"));
app.use(express.static("public"));
app.use(express.urlencoded({ extended: false }));

app.use("/users", userRouters);
app.use("/skills", leadsRouters);

//errroHandelers
app.use(middleware.unknownEndpoint);
app.use(middleware.errorHandler);

app.listen(PORT, () => {
  console.log(`SERVER IS WORKING AT PORT ${PORT}...`);
});
