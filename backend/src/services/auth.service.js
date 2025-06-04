import { findUserByEmail } from "../dao/user.dao.js";
import { createUser } from "../dao/user.dao.js";
import { ConflictError } from "../utils/errorHandler.js";
import { signToken } from "../utils/helper.js";

export const registerUser = async (username, email, password) => {
  // Check if user already exists
  const existingUser = await findUserByEmail(email);
  if (existingUser) {
    throw new ConflictError("User already exists");
  }

  // Create new user
  const newUser = await createUser(username, email, password);

  // Generate JWT token
  const token = signToken({ id: newUser._id });

  return {token, newUser};
};

export const loginUser = async (email, password) => {
  // Check if user exists
  const user = await findUserByEmail(email);
  if (!user) {
    throw new ConflictError("Invalid email or password");
  }

  // Check if password matches
  if ( user.password !== password ) {
    throw new ConflictError("Invalid email or password");
  }

  // Generate JWT token
  const token = signToken({ id: user._id });

  return {token, user};
};
