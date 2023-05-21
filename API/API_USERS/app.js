var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
const cors = require("cors");
const db = require("./models/index");
const createRole = require("./utils/createRole.utils");

var indexRouter = require("./routes/index");
var usersRouter = require("./routes/users.routes");

var app = express();

//** WELCOME MSG */
console.log("Démarrage API...");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));
app.use(cors());

app.use("/", indexRouter);
app.use("/users", usersRouter);

// Sync db

console.log("Tentative de synchonisation avec la base de données...");
db.sequelize
  .sync({ force: true })
  .then(() => createRole.startApp())
  .then(() => {
    console.log("\x1b[32m%s\x1b[0m", "DB is SYNC and READY");
  })
  .catch((error) => {
    console.log("Something went wrong...!");
    console.log(error.message);
  });

module.exports = app;
