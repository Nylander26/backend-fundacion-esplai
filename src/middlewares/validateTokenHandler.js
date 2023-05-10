//Required dependencies
const asyncHandler = require("express-async-handler");
const jwt = require("jsonwebtoken");

const validate = asyncHandler(async (req, res, next) => {
  //Declare the token for posterior save and get the authorization header in the request
  let token;
  let authHeader = req.get("authorization" || "Authorization");

  //Manage the bearer string and ask if does exist, then took the token from the string and send it back in the request header
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

    //if there is no token shows the error
    if (!token) {
      res.status(401);
      throw new Error(
        "Usuario no autorizado o el token falta en la solicitud."
      );
    }
  }
});

module.exports = validate;
