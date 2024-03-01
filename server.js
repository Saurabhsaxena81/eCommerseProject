/**
 * This will be the starting file of the project
 */

const express = require("express");
const mongoose = require("mongoose");
const app = express();
const server_config = require("./configs/server.config");
const db_config = require("./configs/db.config");
const user_model = require("./models/user.model");
const bcrypt = require("bcryptjs");
app.use(express.json()); // middleware converts json in the form of javascript
/**
 * Create an admin user at the starting of the application
 * if not already present
 */

// connection to the mongoDB
mongoose.connect(db_config.DB_URL);

const db = mongoose.connection;

db.on("error", () => {
  console.log("Error while connecting  to the mongodb");
});

db.once("open", () => {
  console.log("connected to the mongodb");
  init();
});

async function init() {
  try {
    let user = await user_model.findOne({ userId: "admin" });

    if (user) {
      console.log("Admin is already present ");
      return;
    }
  } catch (error) {
    console.log("Error while reading the data", error);
  }
  try {
    user = await user_model.create({
      name: "Saurabh",
      userId: "admin",
      email: "saurabhsaxena@gmail.com",
      userType: "ADMIN",
      password: bcrypt.hashSync("welcome", 8), //here 8 is used as a salt
      //salt base encryption
    });
    console.log("Admin created", user);
  } catch (err) {
    console.log("Error while creating the user ", err);
  }
}

/**
 * Stich the route to the server
 */
require("./routes/auth.routes")(app);
/**
 *
 * start the server
 */

app.listen(server_config.PORT, () => {
  console.log("Server started at port number : ", server_config.PORT);
});
