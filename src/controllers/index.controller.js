const User = require("../models/users");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const indexCtrl = {};
const asyncHandler = require("express-async-handler");

//GET ROUTES METHODS

//@desc render index
//@route GET /
//@access public
indexCtrl.renderIndex = (req, res) => {
  res.json({
    message: "Welcome to Login & Register server",
  });
};

//@desc login page
//@route GET /api/login
//@access public
indexCtrl.postLogin = asyncHandler(async (req, res) => {
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
});

//@desc SHOWS THE CURRENT USER INFO (A PROTECTED ROUTE THAT SHOWS THE USER INFO)
//@route GET /api/home
//@access private
indexCtrl.renderUserInfo = (req, res) => {
  res.json(req.user)
};

//POST ROUTE METHODS

//@desc THIS CONTROLLER MANAGES THE POST METHOD FOR CREATE AN USER
//@route POST /api/register
//@access public
indexCtrl.registerController = asyncHandler(async (req, res) => {
  const { name, lastname, email, password } = req.body;

  if (!name || !lastname || !email || !password) {
    res.status(400);
    throw new Error("Todos los campos son obligatorios.");
  } else {
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

      if (newUser) {
        res.status(201).json({ message: 'Registro Exitoso '})
      } else {
        res.status(400);
        throw new Error("Error al registrar al usuario.");
      }
    }
  }
});

module.exports = indexCtrl;
