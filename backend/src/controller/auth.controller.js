import { loginUser, registerUser } from "../services/auth.service.js";
import { cookieOptions } from "../config/config.js";

const register_user = async (req, res) => {
  const { username, email, password } = req.body;
  const {token, user} = await registerUser(username, email, password);
  req.user = user;
  res.cookie("accessToken", token, cookieOptions);
  res.status(200).json({ message: "register success" });
};

const login_user = async (req, res) => {
  const { email, password } = req.body;
  const {token, user} = await loginUser(email, password);
  req.user = user;
  res.cookie("accessToken", token, cookieOptions);
  res.status(200).json({user:user, message: "login success" });
};

const logout_user = async (req, res) => {
  // Logout logic
};

export { register_user, login_user, logout_user };