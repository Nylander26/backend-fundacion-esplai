const asyncHandler = require("express-async-handler");
const jwt = require("jsonwebtoken");

const validate = asyncHandler(async (req, res, next) => {
  let token;
  let authHeader = req.get("authorization" || "Authorization");

  if (authHeader && authHeader.toLocaleLowerCase().startsWith("bearer")) {
    token = authHeader.split(" ")[1];
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
      if (err) {
        res.status(401);
        throw new Error("Usuario no autorizado.");
      }
      req.user = decoded.user;
      req.token = token;
      next();
    });

    if (!token) {
      res.status(401);
      throw new Error(
        "Usuario no autorizado o el token falta en la solicitud."
      );
    }
  }
});

module.exports = validate;
