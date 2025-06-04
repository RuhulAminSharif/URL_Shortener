import { findUserById } from "../dao/user.dao.js";
import { verifyToken } from "../utils/helper.js";

export const authMiddleware = (req, res, next) => {
  const token = req.cookies.accessToken;

  if (!token) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  try {
    const decoded = verifyToken(token);
    const user = findUserById(decoded);
    if (!user) {
      return res.status(401).json({ message: "Unauthorized" });
    } 
    req.user = user;
    next();
  } catch (error) {
    console.log(error);
    return res.status(403).json({ message: "Forbidden" });
  }
};