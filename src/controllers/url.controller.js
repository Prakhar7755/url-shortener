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

async function handleDeleteUrl(req, res) {
  try {
    const shortId = req.params.id;
    const result = await URL.findOneAndDelete({ shortId });

    if (!result) return res.json({ message: 'failed to fetch url' });

    console.log(result.redirectURL, 'successfully deleted');
    return res.json({ message: 'Url successfully deleted', details: result });
  } catch (error) {
    console.error('Failed to Delete the url', error);
    res.json({ error: 'failed to delete url' });
    return false;
  }
}
export { handleGenerateShortURL, handleRedirectUrl, handleGetAnalytics, handleDeleteUrl };
