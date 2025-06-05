import { createShortUrlWithoutUser, createShortUrlWithUser } from "../services/short_url.service.js";
import { getLongUrlFromShortUrl } from "../dao/short_url.js";

export const createShortUrl = async (req, res, next) => {
  try {
    const data = req.body;
    // console.log(data);
    let shortUrl;
    if( req.user ) {
      shortUrl = await createShortUrlWithUser(data.full_url, req.user._id, data.slug );
    } else {
      shortUrl = await createShortUrlWithoutUser(data.full_url);
    }
    res.status(200).json({ shortUrl: process.env.APP_URL + shortUrl });
  } catch (error) {
    next(error);
  }
};

export const redirectFromShortUrl = async (req, res) => {
  try {
    const { shortUrl } = req.params;
    const urlDoc = await getLongUrlFromShortUrl(shortUrl);
    if (urlDoc) {
      return res.redirect(urlDoc.full_url);
    } else {
      return res.status(404).send("URL not found");
    }
  } catch (err) {
    console.log(err);
    return res.status(500).send("Server error");
  }
};
