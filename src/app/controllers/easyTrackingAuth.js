const express = require('express');
const authMiddlewares = require('../middlewares/auth');

const router = express.Router();

router.use(authMiddlewares);

router.get('/', (req, res) => {
    res.send({ susess: true, user: req.userId })
});

module.exports = app => app.use('/easytracking', router);