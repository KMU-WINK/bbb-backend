const express = require('express');
const router = express.Router();
const passport = require('passport');
const { isNotLoggedIn, isLoggedIn } = require('../middlewares');
const { join, login, logout } = require('../controllers/auth');

// POST /auth/join
router.post('/join', isNotLoggedIn, join);
// POST /auth/login
router.post('/login', isNotLoggedIn, login);
// GET /auth/logout
router.get('/logout', isLoggedIn, logout);
// GET /auth/kakao
router.get('/kakao', passport.authenticate('kakao'));
// GET /auth/kakao/callback
router.get('/kakao/callback', passport.authenticate('kakao', {
    failureRedirect: '/?error=카카오로그인실패',
}), (req, res) => {
    res.redirect('/'); // 성공 시
});

module.exports = router;