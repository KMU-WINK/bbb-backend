const Book = require('../models/book');
const UserBook = require('../models/userBook');

exports.addToWishlist = async (req, res) => {
    try {
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
            defaults: { status: 'to-read' },
        });
        if (!created) {
            if (userBook.status == 'to-read') {
                return res.json({ 
                    message: '이미 찜한 책입니다.',
                    success: false,
                });
            };
            userBook.update({ status: 'to-read' });
            return res.json({
                message: '찜 목록으로 이동했습니다.',
                success: true,
                data: userBook,
            });
        };
        return res.json({
            message: '찜 목록에 추가했습니다.',
            success: true,
            date: userBook,
        });
    } catch (error) {
        console.error(error);
        return res.json({
            message: '찜하는 과정에서 오류가 발생했습니다.',
            success: false,
        });
    };
};

exports.showWishlist = async (req, res) => {
    try {
        const userId = req.user.userId;
        const toReadBookId = await UserBook.findAll({ 
            where: { userId, status: 'to-read' },
            attributes: ['bookId'],
        });
        const toReadBook = await Book.findAll({
            where: { bookId: toReadBookId.map(item => item.bookId) },
        });
        return res.json({
            message: '읽을 책을 불러옵니다.',
            success: true,
            data: toReadBook,
        });
    } catch (error) {
        console.error(error);
        return res.json({
            message: '읽을 책을 불러오는 과정에서 오류가 발생했습니다.',
            success: false,
        });
    };
};