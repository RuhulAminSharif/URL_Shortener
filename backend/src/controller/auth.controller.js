import { loginUser, registerUser } from "../services/auth.service.js";
import { cookieOptions } from "../config/config.js";
import { findUserById } from "../dao/user.dao.js";

const register_user = async (req, res) => {
  const { name: username, email, password } = req.body;
  const { token, user } = await registerUser(username, email, password);
  req.user = user;
  res.cookie("accessToken", token, cookieOptions);
  res.status(200).json({ message: "register success" });
};

const login_user = async (req, res) => {
  const { email, password } = req.body;
  const { token, user } = await loginUser(email, password);
  req.user = user;
  res.cookie("accessToken", token, cookieOptions);
  res.status(200).json({ user: user, message: "login success" });
};

const logout_user = async (req, res) => {
  res.clearCookie("accessToken", cookieOptions);
  req.user = null;
  res.status(200).json({ message: "logout success" });
};

const get_current_user = async (req, res) => {
  if (!req.user) {
    return res.status(401).json({ message: "Unauthorized" });
  }
  const { _id } = await req.user;
  const data = await findUserById(_id);
  // res.status(200).json({ message: "success", urls });
  res.status(200).json({ data, user: req.user });
};

export { register_user, login_user, logout_user, get_current_user };
