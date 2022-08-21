const express = require('express');
const router = express.router();
const authMiddleware = require('../utils/authMiddleware');
const auth = require('../controllers');

router.post('/register', auth.register);
router.post('/login', auth.login);
router.get('/users', authMiddleware, auth.getUser);

module.exports = router;
