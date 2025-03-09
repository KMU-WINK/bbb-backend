const Book = require('../models/book');
const UserBook = require('../models/userBook');

exports.addToFinishlist = async (req, res) => {
    try {
        const userId = req.user.id;
        const {bookId} = req.body;
        const [result] = await UserBook.update( { status: 'read' }, { where: { userId, bookId } });
        if (result === 0) {
            return res.json({
                message: '등록되지 않은 책입니다.',
                success: false,
            });
        };
        return res.json({
            message: '책을 다 읽었습니다.',
            success: true,
        });
    } catch (error) {
        console.error(error);
        res.json({
            message: '책을 완료 목록으로 이동하는 과정에서 오류가 발생했습니다.',
            success: false,
        });
    };
};

exports.showFinishlist = async (req, res) => {
    try {
        const userId = req.user.id;
        const readBookId = await UserBook.findAll({
            where: { userId, status: 'read' },
            attributes: ['bookId'],
        });
        const readBook = await Book.findAll({
            where: { id : readBookId.map(itme => itme.bookId )},
        });
        return res.json({
            message: '읽은 책을 불러옵니다.',
            success: true,
            data: readBook,
        })
    } catch (error) {
        console.error(error);
        return res.json({
            message: '다 읽은 책 목록을 불러오는 과정에서 오류가 발생했습니다.',
            success: false,
        });
    };
};

exports.deleteFinishlist = async (req, res) => {
    try {
        const userId = req.user.id;
        const {bookId} = req.body;
        const result = await UserBook.destroy({ where: { userId, bookId, status: 'read' } });
        if (result === 0) {
            return res.json({
                message: '등록되지 않은 책입니다.',
                success: false,
            });
        };
        return res.json({
            message: '책이 정상적으로 삭제되었습니다.',
            success: true,
        });
    } catch (error) {
        console.error(error);
        return res.json({
            message: '읽은 책을 삭제하는 과정에서 오류가 발생했습니다.',
            success: false,
        });
    };
};