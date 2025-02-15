const express = require('express');
const cookieParser = require('cookie-parser');
const morgan = require('morgan');
const session = require('express-session');
const multer = require('multer');
const dotenv = require('dotenv');
const passport = require('passport');
const nunjucks = require('nunjucks');
const path = require('path');

dotenv.config();

const authRouter = require('./routes/auth');
const bookRouter = require('./routes/books');
const wishlistRouter = require('./routes/wishlist');
const registerlistRouter = require('./routes/registerlist');
const { sequelize } = require('./models/index');
const passportConfig = require('./passport');

const app = express();
passportConfig();

app.set('port', process.env.PORT || 3000);
app.set('view engine', 'html');
nunjucks.configure('views', {
    express: app,
    watch: true,
});

sequelize.sync( { force: false } ) // 배포 시 false로 바꾸기
    .then(() => {
        console.log('데이터베이스 연결 성공');
    })
    .catch((err) => {
        console.error(err);
    });

app.use(morgan('dev'));
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());
app.use(express.urlencoded( { extended: false } ));
app.use(cookieParser(process.env.COOKIE_SECRET));
app.use(session({
    resave: false,
    saveUninitialized: false,
    secret: process.env.COOKIE_SECRET,
    cookie: {
        httpOnly: true,
        secure: false,
    },
}));

app.use(passport.initialize());
app.use(passport.session()); // 브라우저에 connect.sid 세션 쿠키 전송

app.use('/auth', authRouter);
app.use('/books', bookRouter);
app.use('/wishlist', wishlistRouter);
app.use('/registerlist', registerlistRouter);
// app.use('/bookshelf', bookshelfRouter);
// app.use('/notes', noteRouter);
// app.use('/reviews', reviewRouter);

app.use((req, res, next) => {
    const error = new Error(`${req.method} ${req.url} 라우터가 없습니다.`);
    error.status = 404;
    next(error);
});
app.use((req, res, err, next) => {
    res.locals.message = err.message;
    res.locals.error = process.env.NODE_ENV !== 'production' ? err : {};
    res.status(err.status || 500);
    res.render('error');
});
app.listen(app.get('port'), () => {
    console.log(`${app.get('port')}번 포트에서 서버 실행 중`);
});