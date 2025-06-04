import { generateNanoId } from "../utils/helper.js";
import { getCustomShortUrl, saveShortUrl } from "../dao/short_url.js";

export const createShortUrlWithoutUser = async (longUrl) => {
  try{
    const shortUrl = generateNanoId(8);
    if (!shortUrl) throw new Error("Short URL not generated");
    await saveShortUrl(shortUrl, longUrl);
    return shortUrl;
  }catch(err){
    // console.error("Error in createShortUrlWithoutUser:", err);
    throw new Error(`Failed to create short URL, ${err.message}`);
  }
};

export const createShortUrlWithUser = async (longUrl, userId, slug=null) => {
  const shortUrl = slug || generateNanoId(8);
  const exists = await getCustomShortUrl(shortUrl);
  if( exists ) {
    throw new Error("This custom URL already exists, please try another one.");
  }
  await saveShortUrl(shortUrl, longUrl, userId);
  return shortUrl;
};
