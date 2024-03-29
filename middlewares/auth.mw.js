const user_model = require("../models/user.model");
const jwt = require("jsonwebtoken");
const auth_cofig = require("../configs/auth.config");
/**
 * Create a middleware will check if the request body is proper and correct
 */
const verifySignUpBody = async (req, res, next) => {
  try {
    // Check for the name
    if (!req.body.name) {
      return res.status(400).send({
        message: "Failed! Name was not provide in the request body",
      });
    }
    //check for the email
    if (!req.body.email) {
      return res.status(400).send({
        message: "Failed! Email was not provide in the request body",
      });
    }
    // check for the userid
    if (!req.body.userId) {
      return res.status(400).send({
        message: "Failed! userId was not provide in the request body",
      });
    }
    //check if the user with the same user id is present
    const user = await user_model.findOne({ userId: req.body.userId });
    if (user) {
      return res.status(400).send({
        message: "Failed! user with the same userId is already present ",
      });
    }
    next();
  } catch (error) {
    console.log("error while validating the request object ", error);

    res.status(500).send({
      message: "Error while validating the request body",
    });
  }
};
const verifySignInBody = async (req, res, next) => {
  if (!req.body.userId) {
    return res.status(400).send({
      message: "userId is not provided",
    });
  }
  if (!req.body.password) {
    return res.status(400).send({
      message: "password is not provided",
    });
  }
  next();
};

const verifyToken = (req, res, next) => {
  //Check if the token is present in the header
  const token = req.header["x-access-token"];

  //if it's the valid token
  if (!token) {
    return res.status(403).send({
      message: "No token found : Unauthorized ",
    });
  }
  jwt.verify(token, auth_config.secret, async (err, decoded) => {
    if (err) {
      return res.status(401).send({
        message: "Unauthorized !",
      });
    }
    const user = await user_model.findOne({ userId: decode.id });
    if (!user) {
      return res.status(400).send({
        message: "UnAuthorized , this user dosen't exist",
      });
    }
    // set the user info in the req body
    next();
  });
  //then move to the next step
  // next();
};

const isAdmin = (req, res, next) => {
  const user = req.user;
  if (user && userType == "ADMIN") {
    next();
  } else {
    return res.status(403).send({
      message: "Only admin users are allowed to access this end-point",
    });
  }
};

module.exports = {
  verifySignUpBody: verifySignUpBody,
  verifySignInBody: verifySignInBody,
  verifyToken: verifyToken,
  isAdmin: isAdmin,
};
