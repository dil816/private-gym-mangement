import { User } from "../models/userModel.js";
import jwt from "jsonwebtoken";

//create jwt token
const createToken = (_id) => {
  return jwt.sign({ _id }, process.env.SECRET, { expiresIn: "3d" });
};

// login user
export const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.ulogin(email, password);

    //create token
    const token = createToken(user._id);

    res.status(200).json({ email, token });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
  //res.json({ mssg: "login user" });
};

// signup user
export const signupUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.signup(email, password);

    //create token
    const token = createToken(user._id);

    res.status(200).json({ email, token });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
  //res.json({ mssg: "signup user" });
};
