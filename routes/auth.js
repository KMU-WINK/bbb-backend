const express = require('express');
const router = express.Router();
const passport = require('passport');
const { isNotLoggedIn, isLoggedIn } = require('../middlewares');
const { join, login, logout, kakaoLogin } = require('../controllers/auth');

// POST /auth/join
router.post('/join', isNotLoggedIn, join);
// POST /auth/login
router.post('/login', isNotLoggedIn, login);
// POST /auth/logout
router.post('/logout', isLoggedIn, logout);
// GET /auth/kakao
router.get('/kakao', isNotLoggedIn, (req, res) => {
    const redirectUri = `https://kauth.kakao.com/oauth/authorize?client_id=${process.env.KAKAO_CLIENT_ID}&redirect_uri=${process.env.KAKAO_REDIRECT_URI}&response_type=code`;
    res.redirect(redirectUri);  // 카카오 로그인 페이지로 리디렉션
});
// GET /auth/kakao/callback
router.get('/kakao/callback', kakaoLogin);

module.exports = router;