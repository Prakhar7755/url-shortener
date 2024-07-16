import { Router } from 'express';
import {
  handleGenerateShortURL,
  handleRedirectUrl,
  handleGetAnalytics,
  handleDeleteUrl,
} from '../controllers/url.controller.js';

const router = Router();

router.post('/', handleGenerateShortURL);
router.get('/:shortId', handleRedirectUrl);
router.get('/analytics/:shortId', handleGetAnalytics);
router.delete('/:id', handleDeleteUrl);

export default router;
