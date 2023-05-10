//Require the constants for posterior use
const { constants } = require("../constants");

//Logic that will handle the status of the server and shows the proper information for the user
const errorHandler = (err, req, res) => {
  const statusCode = res.statusCode ? res.statusCode : 500;
  switch (statusCode) {
    //if validation fail
    case constants.VALIDATION_ERROR:
      res.json({
        title: "Validation Failed",
        message: err.message,
        stackTrace: err.stack,
      });
      break;
      //if user doesn't have the token
    case constants.UNATHORIZED:
      res.json({
        title: "Unathorized",
        message: err.message,
        stackTrace: err.stack,
      });
      break;
      //if the route is forbidden for the user
    case constants.FORBIDDEN:
      res.json({
        title: "Forbidden",
        message: err.message,
        stackTrace: err.stack,
      });
      break;
      //if the page is not found or the route doesn't exist
    case constants.NOT_FOUND:
      res.json({
        title: "Not Found",
        message: err.message,
        stackTrace: err.stack,
      });
      break;
      //if the server is busy or the client send a request that server can't handle
    case constants.SERVER_ERROR:
      res.json({
        title: "Server Error",
        message: err.message,
        stackTrace: err.stack,
      });
      break;
    default:
      //Just a default Message :D
      console.log("No Error :D");
      break;
  }
};

module.exports = errorHandler;
