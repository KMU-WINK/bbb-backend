exports.isLoggedIn = (req, res, next) => {
    if (req.isAuthenticated()) { // 패스포트 통해 로그인 여부
        next();
    } else {
        res.status(403).send({
            message: '로그인이 필요합니다.',
            success: false,
        });
    }
};

exports.isNotLoggedIn = (req, res, next) => {
    if (!req.isAuthenticated()) {
        next();
    } else {
        res.status(409).send({
            message: '이미 로그인한 상태입니다.',
            success: false,
        })
    }
};