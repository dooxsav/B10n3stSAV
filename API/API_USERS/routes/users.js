var express = require("express");
var router = express.Router();
const UserController = require("../controllers/user.constroller");

/* GET users listing. */
router.get("/", UserController.Test);

module.exports = router;
