const User = require('../models/user.model');
const bcrypt = require('bcrypt');
const getImageFileType = require('../utils/getImageFileType');
const cleanFiles = require('../utils/cleanFiles');

exports.register = async (req, res) => {
  try {
    const { login, password, phoneNumber } = req.body;
    const fileType = req.file ? await getImageFileType(req.file) : 'unknown';
    if (
      login &&
      typeof login === 'string' &&
      password &&
      typeof password === 'string' &&
      req.file &&
      ['image/png', 'image/jpeg', 'image/gif'].includes(fileType) &&
      phoneNumber &&
      typeof phoneNumber === 'string'
    ) {
      const userWithLogin = await User.findOne({ login: { $eq: login } });
      if (userWithLogin) {
        cleanFiles(req.file.filename);
        return res.status(409).send('User with this login already exists');
      }

      const user = await User.create({
        login,
        password: await bcrypt.hash(password, 10),
        avatar: req.file.filename,
        phoneNumber: phoneNumber,
      });
      res.status(201).send({ message: 'User created ' + user.login });
    } else {
      cleanFiles(req.file.filename);
      res.status(400).send('Bad request');
    }
  } catch (err) {
    cleanFiles(req.file.filename);
    res.status(500).send({ message: err.message });
  }
};

exports.login = async (req, res) => {
  try {
    const { login, password } = req.body;
    if (
      login &&
      typeof login === 'string' &&
      password &&
      typeof password === 'string'
    ) {
      const user = await User.findOne({ login: { $eq: login } });
      if (!user) {
        return res.status(400).send({ message: 'Login or password is not correct' });
      }

      const isPasswordCorrect = await bcrypt.compareSync(password, user.password);
      if (!isPasswordCorrect) {
        return res.status(400).send({ message: 'Login or password is not correct' });
      }

      res.status(200).send({ message: 'User logged in ' + user.login });
      return (req.session.login = user.login);
    } else {
      return res.status(400).send({ message: 'Bad request' });
    }
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};

exports.logout = (req, res) => {
  req.session.destroy();
  res.status(200).send({ message: 'User logged out' });
};
