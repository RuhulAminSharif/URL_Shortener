import { verifyToken } from "./helper.js";
import { findUserById } from "../dao/user.dao.js";

export const attachUser = async(req, res, next) => {
  const token = req.cookies.accessToken;
  if( !token ) return next();
  try {
    const decoded = verifyToken(token);
    const user = await findUserById(decoded); 
    if (user) {
      req.user = user; 
    }
    next();
  } catch (error) {
    console.error("Error attaching user:", error);    
    next();
  }
};