const User = require("../models/users");
const cookieToken = require("../util/cookieToken");

exports.signup = async (req, res) => {
  console.log(req.body);
  const { email, password } = req.body;

  if (!email || !password) {
    res.status(200).json({
      message: "email and password are required",
    });
  }

  const user = await User.create(req.body);

  cookieToken(user, res);
};

exports.login = async (req, res) => {
  const { email, password } = req.body;

  // check for presence of email and password
  if (!email || !password) {
    return res.status(400).json("please provide email and password");
  }

  // get user from DB
  const user = await User.findOne({ email }).select("+password");

  // if user not found in DB
  if (!user) {
    return res.status(400).json("Email or password does not match or exist");
  }

  // match the password
  const isPasswordCorrect = await user.isValidatedPassword(password);

  //if password do not match
  if (!isPasswordCorrect) {
    return res.status(400).json("Email or password does not match or exist");
  }

  // if all goes good and we send the token
  cookieToken(user, res);
};
