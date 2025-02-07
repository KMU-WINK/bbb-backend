const express = require('express');
const router = express.Router();
const { renderMain, renderLogin, renderJoin, renderProfile, renderSearchBox } = require('../controllers/page');
const { isLoggedIn, isNotLoggedIn } = require('../middlewares');

router.use((req, res, next) => {
    res.locals.user = req.user;
    next();
})

router.get('/', renderMain);
router.get('/login', isNotLoggedIn, renderLogin);
router.get('/join', isNotLoggedIn, renderJoin);
router.get('/profile', isLoggedIn, renderProfile);
router.get('/searchBox', renderSearchBox);

module.exports = router;