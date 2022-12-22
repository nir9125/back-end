const Cart = require("../models/cart");

exports.add = async (req, res) => {
  const { id, name, desc, quantity, price } = req.body;

  if (!id || !name || !desc || !quantity || !price) {
    res.status(400).json({
      message: "All fields are required",
    });
  }

  const cart = await Cart.findOne({ user: req.user._id });
  if (!cart) {
    const x = {};
    x.user = req.user._id;
    x.products = [];
    x.products.push(req.body);
    await Cart.create(x);

    return res.status(200).send("Product added to the cart successfully");
  }

  const alreadyPresent = cart.products.find((product) => {
    if (product.id.toString() === id.toString()) {
      return true;
    }
  });

  if (alreadyPresent) {
    return res.status(200).send("product is alreay present in the cart");
  }

  cart.products.push(req.body);

  cart.save();

  res.status(200).send("Product added to the cart successfully");
};

exports.getProducts = async (req, res) => {
  console.log(req.user._id);
  const result = await Cart.findOne({ user: req.user._id });

  console.log(result);

  res.status(200).send(result);
};
