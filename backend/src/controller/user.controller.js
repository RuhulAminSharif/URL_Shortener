import { getAllUserUrlsDao } from "../dao/user.dao.js";

export const getAllUserUrls = async (req, res) => {
  try {
    const { _id } = await req.user;
    const urls = await getAllUserUrlsDao(_id);
    res.status(200).json({ message: "success", urls });
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error", error: error.message });
  }
};