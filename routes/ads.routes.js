const express = require('express');
const router = express.Router();
const adsController = require('../controllers/ads.controller');
const authMiddleware = require('../utils/authMiddleware');
const imageUpload = require('../utils/imageUpload');

router.get('/ads', adsController.getAll);
router.post('/ads', authMiddleware, imageUpload.single('image'), adsController.postAd);
router.get('/ads/:id', adsController.getById);
router.put(
  '/ads/:id',
  authMiddleware,
  imageUpload.single('image'),
  adsController.putAd,
);
router.delete('/ads/:id', authMiddleware, adsController.deleteAd);
router.get('/ads/search/:searchPhrase', adsController.search);

module.exports = router;
