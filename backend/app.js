import express from "express";
import dotenv from "dotenv";
import connectDB from "./src/config/mongo.config.js";
import short_url from "./src/routes/short_url.route.js";
import auth_routes from "./src/routes/auth.routes.js";
import { redirectFromShortUrl } from "./src/controller/short_url.controller.js";
import { errorHandler } from "./src/utils/errorHandler.js";
import cors from "cors";
import { attachUser } from "./src/utils/attachUser.js";
import cookieParser from "cookie-parser";


dotenv.config("./.env");

const app = express();
const PORT = 3000;

app.use(cors(
  {
    origin: ["http://localhost:5173"],
    credentials: true, // Allow cookies to be sent
  },
));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cookieParser());
app.use(attachUser);

app.use("/api/auth", auth_routes)
app.use("/api/create", short_url);
app.get("/:shortUrl", redirectFromShortUrl);

app.use(errorHandler);

app.listen(PORT, () => {
  connectDB();
  console.log(`Server running on http://localhost:${PORT}`);
});
