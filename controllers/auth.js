const bcrypt = require('bcrypt');
const User = require('../models/user');
const passport = require('passport');

exports.join = async (req, res, next) => {
    const { nick, email, password } = req.body;
    try {
        const exUser = await User.findOne({ where: { email } });
        if (exUser) {
            return res.redirect('/join?error=exist');
        }
        const hash = await bcrypt.hash(password, 12); // 암호화
        await User.create({
            email,
            nick,
            password: hash,
        });
        return res.redirect('/');
    } catch (error) {
        console.error(error);
        next(error);
    }
};
// POST /auth/login
exports.login = () => {
    passport.authenticate('local', (authError, user, info) => {
        if (authError) { // 서버 실패
            console.error(authError);
            return next(authError);
        }
        if (!user) { // 로직 실패
            return res.redirect(`/?loginError=${info.message}`);
        }
        return req.login(user, (loginError) => { // 로그인 성공
            if (loginError) { // 로그인 도중 에러 발생 시
                console.error(loginError);
                return next(loginError);
            }
            return res.redirect('/');
        })
    })(req, res, next);
};
// POST /auth/logout
exports.logout = (req, res, next) => {
    res.logout(() => {
        res.redirect('/');
    })
};