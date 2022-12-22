const User = require("../models/users");
const jwt = require("jsonwebtoken");

exports.isLoggedIn = async (req, res, next) => {
  // const token = req.cookies.token || req.header("Authorization").replace("Bearer ", "");

  // check token first in cookies
  let token = req.cookies.token;
  // if token not found in cookies, check if header contains Auth field

  console.log(req.header("Authorization"));

  if (!token && req.header("Authorization")) {
    token = req.header("Authorization").replace("Bearer ", "");
  }

  if (!token) {
    return res.status(401).send("Login first to access this page");
  }

  const decoded = jwt.verify(token, process.env.JWT_SECRET);

  req.user = await User.findById(decoded.id);

  next();
};