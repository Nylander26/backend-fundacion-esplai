const axios = require("axios");
const User = require("../models/users");
const jwt = require("jsonwebtoken");

const indexCtrl = {};

indexCtrl.renderIndex = (req, res) => {
  res.send("hola mundo");
};

indexCtrl.renderLogin = (req, res) => {
  const user = {
    id: 1,
    name: "July",
    email: "julio@gmail.com",
  }

  jwt.sign({ user }, 'secretKey', (err, token) => {
    res.json(token)
  })
}

indexCtrl.renderHome = (req, res) => {
  jwt.verify(req.token, 'secretKey', (err, authData) => {
    if (err) {
      res.status(403).send("Forbidden");
    } else {
      res.json({
        message: "Home",
        authData
      })
    }
  })
};

indexCtrl.verifyToken = (req, res, next) => {
  const token = req.headers.authorization;

  if (typeof token !== 'undefined'){
    const bearerToken = token.split(" ")[1];
    req.token = bearerToken
    next();
  } else {
    res.status(403);
  }
}

module.exports = indexCtrl;
