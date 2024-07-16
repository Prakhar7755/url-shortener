import { Router } from 'express';
import {
  handleGenerateShortURL,
  handleRedirectUrl,
  handleGetAnalytics,
} from '../controllers/url.controller.js';

const router = Router();

router.post('/', handleGenerateShortURL);
router.get('/:shortId', handleRedirectUrl);
router.get('/analytics/:shortId', handleGetAnalytics);

export default router;
