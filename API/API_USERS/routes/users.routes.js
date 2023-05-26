var express = require("express");
var router = express.Router();
const UserController = require("../controllers/user.constroller");

/* GET users listing. */
router.get("/", UserController.Test);
router.post("/createuser_part1", UserController.createUser_part1);
router.get("/createuser_part2", UserController.createUser_part2);
router.get("/allusers", UserController.getAllUser);
router.get('/oneuser', UserController.getUserbyPK);
router.post('/updateuser', UserController.updateUser);

module.exports = router;
