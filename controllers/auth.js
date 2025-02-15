const bcrypt = require('bcrypt');
const User = require('../models/user');
const passport = require('passport');

exports.join = async (req, res, next) => {
    const { email, password } = req.body;
    if (!email || !password) {
        return res.status(400).json({
            message: '이메일 혹은 비밀번호 미입력',
            success: false,
        });
    }
    if (email.includes(" ") || password.includes(" ")) {
        return res.status(400).json({
            message: '이메일 혹은 비밀번호에 공백이 포함되어 있습니다.',
            success: false,
        });
    }
    try {
        const exUser = await User.findOne({ where: { email } });
        if (exUser) {
            return res.status(400).json({ 
                message: '이미 가입된 회원입니다.',
                success: false,
            });
        }
        const hash = await bcrypt.hash(password, 12); // 암호화
        await User.create({
            email,
            password: hash,
        });
        return res.status(201).json({ 
            message: '회원가입이 완료되었습니다.',
            success: true,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            message: '회원 가입 중 에러 발생',
            success: false,
        })
    }
};

exports.login = (req, res, next) => {
    passport.authenticate('local', (authError, user, info) => {
        if (authError) { // 서버 실패
            console.error(authError);
            return res.status(500).json({
                message: '로그인 중 서버 에러 발생',
                success: false,
            })
        }
        if (!user) { // 로직 실패
            return res.status(400).json({ 
                message: info.message,
                success: false,
            });
        }
        return req.login(user, (loginError) => { // 로그인 성공
            if (loginError) { // 로그인 도중 에러 발생 시
                console.error(loginError);
                return res.json({
                    message: '로그인 중 에러 발생',
                    success: false,
                })
            }
            return res.status(200).json({ 
                message: '로그인되었습니다.',
                success: true,
                data: user,
            });
        })
    })(req, res, next);
};

exports.logout = (req, res) => {
    req.logout((err) => {
        if (err) {
            console.error(err);
            return res.json({
                message: '로그아웃 중 에러 발생',
                success: false,
            })
        }
        return res.status(200).json({ 
            message: '로그아웃되었습니다.',
            success: true,
        });
    });
};