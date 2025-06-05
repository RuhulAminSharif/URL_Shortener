import User from '../models/user.model.js';
import UrlModel from '../models/short_url.model.js'
export const findUserByEmail = async (email) => {
  return await User.findOne({ email: email }).select("+password");
}
export const findUserById = async (id) => {
  return await User.findById(id);
}
export const createUser = async (userName, email, password) => {
  const user = new User({ name: userName, email: email, password: password });
  return await user.save();
}
export const updateUser = async (id, userData) => {
  return await User.findByIdAndUpdate(id, userData, { new: true });
}
export const deleteUser = async (id) => {
  return await User.findByIdAndDelete(id);
}
export const findAllUsers = async () => {
  return await User.find({});
}

export const getAllUserUrlsDao = async (id) => {
  // console.log(id);
  // console.log(UrlModel.find({ user: id }));
  return await UrlModel.find({ user: id });
}