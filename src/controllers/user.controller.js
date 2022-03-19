import User from "../models/user.model.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { mongoose } from "mongoose";

/**
 *
 * * login
 *
 */
export const login = async (req, res) => {
  const { username: user, password: pass } = req.body;

  if (!user) return res.status(403).json({ message: "Username is required" });
  if (!pass) return res.status(403).json({ message: "Password is required" });

  const userFound = await User.findOne({ username: user });
  if (!userFound) return res.status(403).json({ message: "User not found" });

  // implementing bcrypt COMPARE
  const hashValid = await bcrypt.compare(pass, userFound.password);

  if (!!hashValid) {
    //  creando token, payload {id, name}
    jwt.sign(
      { id: userFound._id, name: userFound.name },
      process.env.SECRET_KEY,
      {
        expiresIn: "1d",
      },
      (err, token) => {
        !!err || res.status(200).json({ token });
      }
    );
  } else {
    res.status(403).json({ message: "User does not exist" });
  }
};
/**
 *
 * * create user
 *
 */
export const createUser = async (req, res) => {
  const { username, password } = req.body;

  if (!username)
    return res.status(403).json({ message: "Username is required" });
  if (!password)
    return res.status(403).json({ message: "Password is required" });

  // implementing bcrypt HASH
  const hash = await bcrypt.hash(password, 10);
  //
  const newUser = new User({ ...req.body, password: hash });

  try {
    const userSave = await newUser.save();
    res.status(201).json({ notice: `created user ${userSave.username}` });
  } catch (error) {
    res.status(403).json({ message: error.message });
  }
};
/**
 *
 * * get all users
 *
 */
export const getAllUsers = async (req, res) => {
  const users = await User.find();
  !!users.length ? res.status(200).json(users) : res.status(204).send();
};
/**
 *
 * * get user by ID
 *
 */
export const getUserById = async (req, res) => {
  const { id } = req.params;

  try {
    const user = await User.findById(id); //mongoose.Types.ObjectId
    !!user
      ? res.status(200).json(user)
      : res.status(403).json({ message: "User does not exist" });
  } catch (error) {
    res.status(403).json({ message: error.message });
  }
};
/**
 *
 * * delete user
 *
 */
export const deleteUser = async (req, res) => {
  const { id } = req.params;

  try {
    const user = await User.findByIdAndDelete(id);
    !!user
      ? res.status(200).json({ message: `User ${id} delete` })
      : res.status(403).json({ message: "User does not exist" });
  } catch (error) {
    res.status(403).json({ message: error.message });
  }
};
/**
 *
 * * user auth
 *
 */
export const userAuth = async (req, res) => {
  const { token } = req.params;

  // jwt
  jwt.verify(token, process.env.SECRET_KEY, (err, dataAuth) => {
    console.log(dataAuth);
    if (!!err) return res.status(403).json({ message: "Invalid token" });

    res.status(200).json(dataAuth);
  });
  //
};
/**
 *
 *
 *
 *
 *
 *
 *
 *
 *
 *
 *
 *
 *
 *
 *
 */
/**
 *
 * * login GOOGLE
 *
 */
export const loginGoogle = async (req, res) => {
  const { profileObj } = req.body;

  if (!profileObj)
    return res.status(403).json({ message: "Authentication error" });

  const userFound = await User.findOne({
    username: profileObj.email,
    is_google_log: true,
  });

  if (userFound) {
    const payload = { id: userFound._id, ...profileObj };
    jwt.sign(
      payload,
      process.env.SECRET_KEY,
      { expiresIn: "1d" },
      (err, token) => {
        !!err || res.status(200).json({ token });
      }
    );
  } else {
    res.status(403).json({ message: "User does not exist" });
  }
};
/**
 *
 * * create user GOOGLE
 *
 */
export const createUserGoogle = async (req, res) => {
  const { profileObj } = req.body;

  if (!profileObj)
    return res.status(403).json({ message: "Authentication error" });

  //
  const newUser = new User({
    name: profileObj.name,
    username: profileObj.email,
    is_google_log: true,
    profileObj,
  });

  try {
    const userSave = await newUser.save();
    res.status(201).json(userSave);
  } catch (error) {
    res.status(403).json({ message: error.message });
  }
};
