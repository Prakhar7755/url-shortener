import generateShortId from "ssid";
import URL from "../models/url.model.js";

const handleGenerateShortURL = async (req, res) => {
  try {
    const body = req.body;
    if (!body.url) {
      return res.status(400).send({ error: "url is required".toUpperCase() });
    }

    const shortId = generateShortId(8);

    await URL.create({
      shortId: shortId,
      redirectURL: body.url,
      visitHistory: [],
      createdBy:req.user._id
    });

    console.log("URL generated");
    return res.render("home", { id: shortId });
    // return res.json({ id: shortId });
  } catch (error) {
    console.error("Failed to generate short URL:", error);
    res.status(500).send({ message: "URL generation failed" });
    return false;
  }
};

const handleRedirectUrl = async (req, res) => {
  try {
    const shortId = req.params.shortId;

    const entry = await URL.findOneAndUpdate(
      { shortId },
      {
        $push: {
          visitHistory: {
            timestamp: Date.now(),
          },
        },
      },
    );

    if (!entry) {
      console.error("Entry not found for redirection");
      return res.status(404).send({ message: "Entry not found for redirection" });
    }

    res.redirect(entry.redirectURL);
  } catch (error) {
    console.error("Failed to handle redirect:", error);
    res.status(500).send({ message: "Failed to redirect" });
    return false;
  }
};

const handleGetAnalytics = async (req, res) => {
  try {
    const shortId = req.params.shortId;

    const result = await URL.findOne({ shortId });

    if (!result) {
      console.error("URL not found for analytics");
      return res.status(404).json({ message: "URL not found for analytics" });
    }

    return res.json({
      totalClicks: result.visitHistory.length,
      analytics: result.visitHistory,
    });
  } catch (error) {
    console.error("Failed to fetch analytics:", error);
    res.status(500).json({ message: "Failed to fetch analytics" });
    return false;
  }
};

const handleDeleteUrl = async (req, res) => {
  try {
    const shortId = req.params.id;
    const result = await URL.findOneAndDelete({ shortId });

    if (!result) {
      console.error("URL not found for deletion");
      return res.json({ message: "Failed to fetch URL for deletion" });
    }

    console.log(result.redirectURL, "successfully deleted");
    return res.json({ message: "URL successfully deleted", details: result });
  } catch (error) {
    console.error("Failed to delete URL:", error);
    res.status(500).json({ message: "Failed to delete URL" });
    return false;
  }
};

export { handleGenerateShortURL, handleRedirectUrl, handleGetAnalytics, handleDeleteUrl };
