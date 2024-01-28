import mongoose from "mongoose";
import bcrypt from "bcrypt";
import validator from "validator";

//create schema
const Schema = mongoose.Schema;

const userSchema = new Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
});

// static signup method
userSchema.statics.signup = async function (email, passsword) {
  //validation
  if (!email || !passsword) {
    throw Error("All Field must be filled");
  }

  if (!validator.isEmail(email)) {
    throw Error("Email is not valid");
  }

  if (!validator.isStrongPassword(passsword)) {
    throw Error("Password not strong enough");
  }

  const exists = await this.findOne({ email });

  if (exists) {
    throw Error("Email already in use");
  }

  const salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash(passsword, salt);

  const user = await this.create({ email, password: hash });

  return user;
};

// static login method
userSchema.statics.ulogin = async function (email, password) {
  if (!email || !password) {
    throw Error("All Field must be filled");
  }

  const user = await this.findOne({ email });

  if (!user) {
    throw Error("Incorrect email");
  }

  const match = await bcrypt.compare(password, user.password);

  if (!match) {
    throw Error("Incorrect password");
  }

  return user;
};

//create model
export const User = mongoose.model("User", userSchema);
