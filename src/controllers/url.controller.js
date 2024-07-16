import generateShortId from 'ssid';
import URL from '../models/url.model.js';

async function handleGenerateShortURL(req, res) {
  try {
    const body = req.body;
    if (!body.url) {
      return res.status(400).send({ error: 'url is required'.toUpperCase() });
    }

    const shortId = generateShortId(8);

    await URL.create({
      shortId: shortId,
      redirectURL: body.url,
      visitHistory: [],
    });

    console.log('URL generated');
    return res.render('home', { id: shortId });
    // return res.json({ id: shortId });
  } catch (error) {
    console.error('Failed to generate sort url'.toUpperCase());
    res.send({ message: 'URL generation failed' });
  }
}

// async function handleDeleteUrl(req, res) {
//   try {
//     const shortId = req.params
//   } catch (error) {}
// }

async function handleRedirectUrl(req, res) {
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

  res.redirect(entry.redirectURL);
}

async function handleGetAnalytics(req, res) {
  const shortId = req.params.shortId;

  const result = await URL.findOne({ shortId });
  return res.json({
    totalClicks: result.visitHistory.length,
    analytics: result.visitHistory,
  });
}
export { handleGenerateShortURL, handleRedirectUrl, handleGetAnalytics };
