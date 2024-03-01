/**
 * I need to write the controller  / logic to register the user
 */
const bcrypt = require("bcryptjs");
const user_model = require("../models/user.model");
const jwt = require("jsonwebtoken");
const secret = require("../configs/auth.config");
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

exports.signin = async (req, res) => {
  //check if the userId present in the system
  const user = await user_model.findOne({ userId: req.body.userId });
  if (user == null) {
    return res.status(400).send({
      message: "userId passed is not valid userId",
    });
  }
  //if password is correct
  const isPasswordValid = bcrypt.compareSync(req.body.password, user.password);
  if (!isPasswordValid) {
    return res.status(401).send({
      message: "wrong password passed",
    });
  }

  // using jwt we will create the access token with the given TTL and return
  const token = jwt.sign({ id: user.userId }, secret.secret, {
    expiresIn: 120,
  });
  res.status(200).send({
    name: user.name,
    userId: user.userId,
    email: user.email,
    userType: user.userType,
    accessToken: token,
  });
};
