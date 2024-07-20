const express = require('express');
const router = express.Router();
const { urlRoutes } = require('../../constants');
const { loginRoute } = urlRoutes;

// логин
router.post(loginRoute, (req, res) => {
    const userInfo = { id: 1, mail: 'test@mail.ru' };
    res.json(userInfo);
    res.status(201);
});

module.exports = router;
