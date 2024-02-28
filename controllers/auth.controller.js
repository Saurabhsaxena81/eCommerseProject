/**
 * I need to write the controller  / logic to register the user
 */
const bcrypt = require("bcryptjs");
const user_model = require("../models/user.model");
exports.signup = async (req, res) => {
  /**
   * logoc to create user
   */
  //1. Read the request body
  const request_body = req.body; //js object
  //2. insert the data in the Users collection in the MongoDB
  const userObj = {
    name: request_body.name,
    userId: request_body.userId,
    email: request_body.email,
    userType: request_body.userType,
    password: bcrypt.hashSync(request_body.password, 8),
  };
  try {
    const user_created = await user_model.create(userObj);
    /**
     * return this user
     */
    const res_obj = {
      name: user_created.name,
      userId: user_created.userId,
      email: user_created.email,
      userType: user_created.userType,
      createAt: user_created.createdAt,
      updatedAt: user_created.updatedAt,
    };
    res.status(201).send(res_obj);
  } catch (error) {
    console.log("Error while connecting to the user ,", error);
    res.status(500).send({
      message: "Some error happend while registering the user ",
    }); // internal server error
  }
  //3. Return the response to the user
};
