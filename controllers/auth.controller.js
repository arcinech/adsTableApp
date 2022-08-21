const User = require('../models/user.model');
const bcrypt = require('bcrypt');

exports.register = async (req, res) => {
  try {
    const { login, password, avatar, phoneNumber } = req.body;
    if (
      login &&
      typeof login === 'string' &&
      password &&
      typeof password === 'string' &&
      avatar &&
      typeof avatar === 'string' &&
      phoneNumber &&
      typeof phoneNumber === 'string'
    ) {
      const userWithLogin = await User.findOne({ login: { $eq: login } });
      if (userWithLogin) {
        return res.status(409).send('User with this login already exists');
      }

      const user = await User.create({
        login,
        password: await bcrypt.hash(password, 10),
        avatar,
        phoneNumber: phoneNumber,
      });
      res.status(201).send({ message: 'User created ' + user.login });
    } else {
      res.status(400).send('Bad request');
    }
  } catch (err) {
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

exports.getUser = async (req, res) => {
  res.status(200).send({ message: 'User logged!' });
};
