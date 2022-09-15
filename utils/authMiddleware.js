const authMiddleware = async (req, res, next) => {
  console.log(req.session.login);
  if (req.session.login) {
    next();
  } else {
    res.status(401).send({ message: 'Unauthorized' });
  }
};

module.exports = authMiddleware;
