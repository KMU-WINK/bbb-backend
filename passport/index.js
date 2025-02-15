const passport = require('passport');
const local = require('./localStrategy');
const kakao = require('./kakaoStrategy');
const User = require('../models/user');

module.exports = () => {
    passport.serializeUser((user, done) => {
        console.log('serializeUser: ', user.userId);
        done(null, user.userId); // 사용자 아이디만 세션에 저장
    });

    passport.deserializeUser((userId, done) => { // 세션 쿠키로부터 아이디를 찾아 사용자 조회
        User.findOne({ where: { userId } })
            .then(user => done(null, user))
            .catch(err => done(err));
    });
    
    local();
    kakao();
};