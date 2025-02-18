const Book = require('../models/book');
const UserBook = require('../models/userBook');

exports.addToRegisterlist = async (req, res) => {
    try {
        const userId = req.user.id;
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
            where: { userId, bookId: book.id },
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
    } catch (error) {
        console.error(error);
        return res.json({
            message: '책 읽기 목록으로 이동하는 과정에서 오류가 발생했습니다.',
            success: false,
        })
    };
};

exports.showRegisterlist = async (req, res) => {
    try {
        const userId = req.user.id;
        const readingBookId = await UserBook.findAll({ 
            where: { userId, status: 'reading' },
            attributes: ['bookId'],
        });
        const readingBooks = await Book.findAll({
            where: { id: readingBookId.map(item => item.bookId) },
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

exports.deleteRegisterlist = async (req, res) => {
    try {
        const userId = req.user.id;
        const {bookId} = req.body;
        const result = await UserBook.destroy({ where: { userId, bookId, status: 'reading' } });
        if (result === 0) {
            return res.json({
                message: '등록되지 않은 책입니다.',
                success: false,
            });
        };
        return res.json({
            message: '책이 성공적으로 삭제되었습니다.',
            success: true,
            data: { deletedBookId : bookId },
        });
    } catch (error) {
        console.error(error);
        return res.json({
            message: '읽는 중인 책을 삭제하는 과정에서 오류가 발생했습니다.',
            success: false,
        });
    };
};