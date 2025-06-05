import mongoose from "mongoose";

const clickAnalyticsSchema = new mongoose.Schema({
  url: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "shortUrl",
    required: true,
  },
  timestamp: {
    type: Date,
    default: Date.now,
  },
  country: {
    type: String,
    required: false,
  },
  city: {
    type: String,
    required: false,
  },
  device: {
    type: String,
    required: false,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
});

const clickAnalytics = mongoose.model("clickAnalytics", clickAnalyticsSchema);

export default clickAnalytics;
