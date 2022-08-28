const express = require('express');
const router = express.Router();
const adsController = require('../controllers/ads.controller');
const authMiddleware = require('../utils/authMiddleware');
const imageUpload = require('../utils/imageUpload');

router.get('/', adsController.getAll);
router.get('/:id', adsController.getById);
router.post('/', authMiddleware, imageUpload.single('image'), adsController.postAd);
router.put('/:id', authMiddleware, imageUpload.single('image'), adsController.putAd);
router.get('/search/:searchPhrase', adsController.search);
router.delete('/:id', authMiddleware, adsController.deleteAd);

module.exports = router;
