const passport = require('passport');
const { Strategy: KakaoStrategy } = require('passport-kakao');
const User = require('../models/user');

module.exports = () => {
    passport.use(new KakaoStrategy({
        clientID: process.env.KAKAO_ID,
        callbackURL: '/auth/kakao/callback',
    }, async(accessToken, refreshToken, profile, done) => {
        console.log('kakao profile', profile);
        try {
            const exUser = await User.findOne({
                where: { email, provider: 'kakao' },
            });
            if (exUser) {
                if (exUser.provider !== 'kakao') {
                    throw new Error('해당 이메일로 이미 다른 방식으로 가입된 계정이 있습니다.')
                }
                done(null, exUser);
            } else {
                const newUser = await User.create({
                    email: profile._json?.kakao_account?.email,
                    snsId: profile.id,
                    provider: 'kakao',
                });
                done(null, newUser);
            }
        } catch (error) {
            console.error(error);
            done(error);
        }
    }));
};