const bcrypt = require('bcrypt');
const User = require('../models/user');
const passport = require('passport');

exports.join = async (req, res, next) => {
    const { email, password } = req.body;
    try {
        const exUser = await User.findOne({ where: { email } });
        if (exUser) {
            return res.status(400).json({ message: '이미 가입된 회원입니다.' });
        }
        const hash = await bcrypt.hash(password, 12); // 암호화
        await User.create({
            email,
            password: hash,
        });
        return res.status(201).json({ message: '회원가입이 완료되었습니다.' });
    } catch (error) {
        console.error(error);
        next(error);
    }
};

exports.login = () => {
    passport.authenticate('local', (authError, user, info) => {
        if (authError) { // 서버 실패
            console.error(authError);
            return next(authError);
        }
        if (!user) { // 로직 실패
            return res.status(400).json({ message: info.message });
        }
        return req.login(user, (loginError) => { // 로그인 성공
            if (loginError) { // 로그인 도중 에러 발생 시
                console.error(loginError);
                return next(loginError);
            }
            return res.status(200).json({ 
                message: '로그인되었습니다.',
                user: {
                    email: user.email,
                }
            });
        })
    })(req, res, next);
};

exports.logout = (req, res, next) => {
    req.logout((err) => {
        if (err) {
            console.error(err);
            return next(err);
        }
        return res.status(200).json({ message: '로그아웃되었습니다.' });
    });
};