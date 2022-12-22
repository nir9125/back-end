const express = require("express");
const router = express.Router();

const { add, getProducts } = require("../controllers/cartController");

const { isLoggedIn } = require("../middlewares/user");

router.route("/product").post(isLoggedIn, add);
router.route("/products").get(isLoggedIn, getProducts);
module.exports = router;
