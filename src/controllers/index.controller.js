const axios = require("axios");
const User = require("../models/users");
const jwt = require("jsonwebtoken");
const asyncHandler = require("express-async-handler");
const bcrypt = require("bcrypt");

const indexCtrl = {};

//@desc render index
//@route GET /
//@access public
indexCtrl.renderIndex = (req, res) => {
  res.json({
    message: "Welcome to Express Boilerplate",
  });
};

//@desc register page
//@route GET /api/register
//@access public
indexCtrl.renderRegister = (req, res) => {
  res.render("register");
};

//@desc register post controller
//@route POST /api/register
//@access public
indexCtrl.registerController = asyncHandler(async (req, res) => {
  const { name, lastname, email, password, passwordChecker } = req.body;

  if (!name || !lastname || !email || !password) {
    res.status(400);
    throw new Error("Todos los campos son obligatorios.");
  }
  // else if (password !== passwordChecker) {
  //   res.status(400);
  //   throw new Error("Las contraseñas no coinciden.");
  // }
  else {
    const userAvailable = await User.findOne({ email });
    if (userAvailable) {
      res.status(400);
      throw new Error("El email ya está registrado.");
    } else {
      //Hash password
      const hashedPassword = await bcrypt.hash(password, 10);
      const newUser = await User.create({
        name,
        lastname,
        email,
        password: hashedPassword,
      });

      console.log("Register Successfull");

      if (newUser) {
        res.status(201).json({
          _id: newUser.id,
          name: newUser.name,
          lastname: newUser.lastname,
          email: newUser.email
        });
      } else {
        res.status(400);
        throw new Error("Error al registrar al usuario.");
      }
    }
  }
});

//@desc login page
//@route GET /api/login
//@access public
indexCtrl.renderLogin = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    res.status(400);
    throw new Error("Todos los campos son obligatorios.");
  }
  const user = await User.findOne({ email });

  //Compare password with hashpassword
  if (user && (await bcrypt.compare(password, user.password))) {
    const accessToken = jwt.sign(
      {
        user: {
          name: user.name,
          lastname: user.lastname,
          email: user.email,
          id: user.id,
        },
      },
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: "15m" }
    );
    res.status(200).json({ accessToken });
  } else {
    res.status(401);
    throw new Error("Credenciales incorrectas.");
  }
  // jwt.sign({ user }, "secretKey", (err, token) => {
  //   res.json(token);
  // });
});

//@desc home page
//@route GET /api/home
//@access private
indexCtrl.renderHome = (req, res) => {
  res.json(req.user);
}

indexCtrl.verifyToken = (req, res, next) => {
  const token = req.headers.authorization;

  if (typeof token !== "undefined") {
    const bearerToken = token.split(" ")[1];
    req.token = bearerToken;
    next();
  } else {
    res.status(403);
  }
};

module.exports = indexCtrl;
