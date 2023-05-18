var express = require("express");
var router = express.Router();
const UserController = require("../controllers/user.constroller");

/* GET users listing. */
router.get("/", UserController.Test);
router.post("/createuser_part1", UserController.createUser_part1);

module.exports = router;
