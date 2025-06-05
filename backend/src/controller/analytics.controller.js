import clickAnalytics from "../models/clickAnalytics.model.js";
import urlSchema from "../models/short_url.model.js";

const getUrlsAnalytics = async (req, res) => {
  try {
    const { timeRange } = req.query;
    // console.log(timeRange);

    let startDate = new Date();
    if (timeRange === "week") {
      startDate.setDate(startDate.getDate() - 7);
    } else if (timeRange === "month") {
      startDate.setMonth(startDate.getMonth() - 1);
    } else if( timeRange === "year") {
      startDate.setFullYear(startDate.getFullYear() - 1);
    }
    const now = new Date();

    const analytics = await clickAnalytics.aggregate([
      {
        $match: {
          timestamp: {
            $gte: startDate,
            $lte: now,
          },
        },
      },
      {
        $group: {
          _id: {
            $dateToString: { format: "%Y-%m-%d", date: "$timestamp" },
          },
          clicks: { $sum: 1 },
        },
      },
      {
        $sort: { _id: 1 },
      },
      {
        $project: {
          _id: 0,
          date: "$_id",
          clicks: 1,
        },
      },
    ]);
    res.json(analytics);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to get analytics" });
  }
};

const getUrlDetails = async (req, res) => {
  try {
    const { shortId } = req.params;
    // query based on short_url or _id
    const url = await urlSchema.findOne({ short_url: shortId });

    if (!url) return res.status(404).json({ error: "URL not found" });

    // const clicks = await ClickAnalytics.find({ url: url._id });

    // res.json({ url, clicks });
    res.json({ url });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to get URL details" });
  }
};

export { getUrlsAnalytics, getUrlDetails };
