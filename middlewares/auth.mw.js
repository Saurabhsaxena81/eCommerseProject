const user_model = require("../models/user.model");

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
module.exports = {
  verifySignUpBody: verifySignUpBody,
};
