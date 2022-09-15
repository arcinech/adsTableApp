const Ad = require('../models/ad.model');
const User = require('../models/user.model');
const escapeHTML = require('../utils/escapeHTML');
const sanitize = require('mongo-sanitize');
const cleanFile = require('../utils/cleanFiles');
const getImageFileType = require('../utils/getImageFileType');

exports.getAll = async (req, res) => {
  console.log('start all');
  try {
    const ads = await Ad.find().populate('user', '-password -__v');
    res.status(200).send(ads);
  } catch (err) {
    res.status(500).json(err);
  }
};

exports.getById = async (req, res) => {
  try {
    const ad = await Ad.findById(sanitize(req.params.id));

    res.status(200).send(ad);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.postAd = async (req, res) => {
  try {
    const { title, description, price, location } = req.body;
    const fileType = req.file ? await getImageFileType(req.file) : 'unknown';
    const userId = await User.findOne({ login: { $eq: req.session.login.login } });
    const ad = await Ad.findOne({
      title: sanitize(title),
      description: sanitize(description),
      price: price,
    });

    if (ad) {
      cleanFile(req.file.filename);
      return res.status(400).json({ message: 'Ad already exists' });
    } else if (
      req.file &&
      !['image/png', 'image/jpeg', 'image/gif'].includes(fileType)
    ) {
      cleanFile(req.file);
      return res.status(400).json({ message: 'File type not allowed' });
    } else if (!title || !description || !price || !location) {
      cleanFile(req.file.filename);
      return res.status(400).json({ message: 'All text fields are required' });
    } else if (
      title.length < 50 &&
      title.length === escapeHTML(title).length &&
      description.length < 500 &&
      price > 0 &&
      price < 1000000 &&
      location.length < 50
    ) {
      const newAd = new Ad({
        title: escapeHTML(title),
        description: escapeHTML(description),
        price: price,
        image: req.file.filename,
        user: userId._id,
        createdAt: Date.now(),
        location: escapeHTML(location),
      });
      console.log(newAd);
      await newAd.save();
      return res.status(201).send(newAd);
    } else {
      cleanFile(req.file.filename);
      return res.status(400).json({ message: 'Invalid data' });
    }
  } catch (err) {
    cleanFile(req.file.filename);
    res.status(500).json({ message: err.message });
  }
};

exports.putAd = async (req, res) => {
  try {
    const { title, description, price, location } = req.body;
    const fileType = req.file ? await getImageFileType(req.file) : 'unknown';
    const ad = await Ad.findById(sanitize(req.params.id));
    const userId = await User.findOne({ login: { $eq: req.session.login } });
    if (!ad) {
      cleanFile(req.file);
      return res.status(404).json({ message: 'Ad not found' });
    } else if (ad.login !== userId.login) {
      cleanFile(req.file);
      return res.status(403).json({ message: 'You are not allowed to edit this ad' });
    } else if (
      req.file &&
      !['image/png', 'image/jpeg', 'image/gif'].includes(fileType)
    ) {
      cleanFile(req.file.filename);
      return res.status(400).json({ message: 'Invalid data' });
    } else if (
      title.length < 50 &&
      title.length === escapeHTML(title).length &&
      description.length < 500 &&
      price > 0 &&
      price < 1000000 &&
      location.length < 50
    ) {
      ad.title = escapeHTML(title) ?? ad.title;
      ad.description = escapeHTML(description) ?? ad.description;
      ad.price = price ?? ad.price;
      ad.location = escapeHTML(location) ?? ad.location;
      if (req.file) {
        ad.image = req.file.filename;
      }
      await ad.save();
      return res.status(200).send(ad);
    } else {
      cleanFile(req.file.filename);
      return res.status(400).json({ message: 'Invalid data' });
    }
  } catch (err) {
    cleanFile(req.file.filename);
    res.status(500).json({ message: err.message });
  }
};

exports.search = async (req, res) => {
  try {
    const ads = await Ad.find({
      title: { $regex: req.params.searchPhrase, $options: 'i' },
    });
    if (ads) {
      res.status(200).send(ads);
    } else {
      res.status(404).json({ message: 'Ad not found' });
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.deleteAd = async (req, res) => {
  try {
    const ad = await Ad.findById(sanitize(req.params.id));
    const userId = await User.findOne({ login: { $eq: req.session.login } })._id;
    if (!ad) {
      return res.status(404).json({ message: 'Ad not found' });
    } else if (ad.login !== userId) {
      return res.status(403).json({ message: 'You are not allowed to edit this ad' });
    } else {
      await cleanFile(ad.image);
      await ad.remove();
      res.status(200).json({ message: 'Ad deleted' });
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
