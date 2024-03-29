// const { default: mongoose } = require("mongoose");

const mongoose = require("mongoose");
/**
 * name
 * userId
 * password
 * email
 * userType
 *
 *
 */
const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    userId: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      lowercase: true,
      minLength: 10,
      unique: true,
    },
    userTypes: {
      type: String,
      // required: true,  //we already assign value so it will always be true
      default: "CUSTOMER", //default it will be customer
      enum: ["CUSTOMER", "ADMIN"],
    },
  },
  { timestamps: true, versionKey: false }
);

module.exports = mongoose.model("User", userSchema);
