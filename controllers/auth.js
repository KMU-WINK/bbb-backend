const jwt = require('jsonwebtoken');
const axios = require('axios');
const bcrypt = require('bcrypt');
const User = require('../models/user');
// const passport = require('passport');

exports.join = async (req, res, next) => {
    const { email, password } = req.body;
    if (!email || !password) {
        return res.status(400).json({
            message: '이메일 혹은 비밀번호 미입력',
            success: false,
        });
    };
    if (email.includes(" ") || password.includes(" ")) {
        return res.status(400).json({
            message: '이메일 혹은 비밀번호에 공백이 포함되어 있습니다.',
            success: false,
        });
    };
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

// exports.login = (req, res, next) => {
//     passport.authenticate('local', (authError, user, info) => {
//         if (authError) { // 서버 실패
//             console.error(authError);
//             return res.status(500).json({
//                 message: '로그인 중 서버 에러 발생',
//                 success: false,
//             })
//         }
//         if (!user) { // 로직 실패
//             return res.status(400).json({ 
//                 message: info.message,
//                 success: false,
//             });
//         }
//         return req.login(user, (loginError) => { // 로그인 성공
//             if (loginError) { // 로그인 도중 에러 발생 시
//                 console.error(loginError);
//                 return res.json({
//                     message: '로그인 중 에러 발생',
//                     success: false,
//                 })
//             }
//             return res.status(200).json({ 
//                 message: '로그인되었습니다.',
//                 success: true,
//                 data: {
//                     id: user.id,
//                     email: user.email,
//                     provider: user.provider,
//                 },
//             });
//         })
//     })(req, res, next);
// };

exports.login = async (req, res) => {
    const { email, password } = req.body;
    try {
        const exUser = await User.findOne({ where: { email }});
        if (!exUser) {
            return res.json({
                message: '존재하지 않은 이메일입니다.',
                success: false,
            });
        }
        const result = await bcrypt.compare(password, exUser.password);
        if (!result) {
            return res.json({
                message: '비밀번호가 일치하지 않습니다.',
                success: false,
            });
        };

        // 토큰 생성(유효 시간 1시간)
        const token = jwt.sign(
            { id: exUser.id, email: exUser.email },
            process.env.JWT_SECRET,
            { expiresIn: "1h" },
        )
        return res.json({ 
            message: '로그인 성공',
            success: true,
            token,
        });
    } catch (error) {
        console.error(error);
        return res.json({
            message: '로그인 중 에러 발생',
            success: false,
        });
    };
};

exports.kakaoLogin = async (req, res) => {
    const { code } = req.body; // 카카오에서 받은 Authorization code
    try {
        // 1. 카카오 토큰 요청
        const tokenResponse = axios.post("https://kauth.kakao.com/oauth/token", null, {
            params: {
                grant_type: "authorization_code",
                clientID: process.env.KAKAO_ID,
                redirect_uri: process.env.KAKAO_REDIRECT_URI,
                code,
            },
            headers: { "Content-Type": "application/x-www-form-urlencoded" },
        });
        const { access_token } = (await tokenResponse).data;
        // 2. kakao api로 사용자 정보 가져오기
        const userInfo = axios.get("https://kapi.kakao.com/v2/user/me", {
            headers: { Authorization: `Bearer ${access_token}` },
        });
        const kakaoId = userInfo.id;
        const email = userInfo.email;
        // 3. DB에서 기존 사용자 확인 또는 회원가입
        const user = await User.findOrCreate({
            where: { snsId: kakaoId, provider: 'kakao' },
            defaults: { email },
        })
        // 4. jwt 토큰 발급
        const token = jwt.sign(
            { id: user.id, email: user.email },
            process.env.JWT_SECRET,
            { expiresIn: "1h" },
        );
        return res.json({
            message: '카카오 로그인 성공',
            success: true,
            token,
            user,
        });
    } catch (error) {
        console.error(error);
        return res.json({
            message: '카카오 로그인 실패',
            success: false,
        });
    };
};

exports.logout = (req, res) => {
    return res.status(200).json({ 
        message: '로그아웃되었습니다.',
        success: true,
    });
};