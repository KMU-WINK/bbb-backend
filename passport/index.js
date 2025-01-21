const passport = require('passport');
const local = require('./localStrategy');
const kakao = require('./kakaoStrategy');
const User = require('../models/user');

module.exports = () => {
    passport.serializeUser((user, done) => {
        done(null, user.id); // 사용자 아이디만 세션에 저장
    });

    passport.deserializeUser((id, done) => { // 세션 쿠키로부터 아이디를 찾아 사용자 조회
        User.findOne({ where: { id } })
            .then(user => done(null, user))
            .catch(err => done(err));
    });
    
    local();
    kakao();
};