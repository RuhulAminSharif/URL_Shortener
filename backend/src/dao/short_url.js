import urlSchema from "../models/short_url.model.js";
import { ConflictError } from "../utils/errorHandler.js";

export const saveShortUrl = async (shortUrl, longUrl, userId) => {
  try {
    const newUrl = new urlSchema({
      full_url: longUrl,
      short_url: shortUrl,
    });
    if (userId) {
      newUrl.user = userId;
      console.log(newUrl);
    }
    await newUrl.save();
  } catch (err) {
    // console.log(err);
    if (err.code === 11000) {
      throw new ConflictError("Short URL already Exists");
    }
    
    if (err.name === "ValidationError") {
      const errorMessage = Object.values(err.errors)[0].message;
      // console.log(errorMessage);
      throw new Error(errorMessage);
    }

    throw new Error(err);
  }
};

export const getLongUrlFromShortUrl = async (shortUrl) => {
  return await urlSchema.findOneAndUpdate(
    { short_url: shortUrl },
    { $inc: { clicks: 1 } }
  );
};

export const getCustomShortUrl = async (slug) => {
  return await urlSchema.findOne({ short_url: slug });
};
