const Book = require('../models/book');
const UserBook = require('../models/userBook');

exports.addToRegisterlist = async (req, res) => {
    const userId = req.user.userId;
    const { title, authors, publisher, isbn, thumbnail } = req.body;
    const [book] = await Book.findOrCreate({ 
        where: { isbn },
        defaults: {
            title,
            authors,
            publisher,
            isbn,
            thumbnail,
        },
    });
    const [userBook, created] = await UserBook.findOrCreate({
        where: { userId, bookId: book.bookId },
        defaults: { status: 'reading' },
    });
    if (!created) {
        if (userBook.status == 'reading') {
            return res.json({ 
                message: '이미 읽고 있는 책입니다.',
                success: false,
            });
        };
        userBook.update({ status: 'reading' });
        return res.json({
            message: '책을 읽기 시작합니다.',
            success: true,
            data: userBook,
        });
    };
    return res.json({
        message: '책을 읽기 시작합니다.',
        success: true,
        date: userBook,
    });
};

exports.showRegisterlist = async (req, res) => {
    try {
        const userId = req.user.userId;
        const readingBookId = await UserBook.findAll({ 
            where: { userId, status: 'reading' },
            attributes: ['bookId'],
        });
        const readingBooks = await Book.findAll({
            where: { bookId: readingBookId.map(item => item.bookId) },
        })
        return res.json({
            message: '읽는 중인 책을 불러옵니다.',
            success: true,
            data: readingBooks,
        });
    } catch (error) {
        console.error(error);
        return res.json({
            message: '읽는 중인 책을 불러오는 과정에서 오류가 발생했습니다.',
            success: false,
        });
    };
};