const UserBook = require('../models/userBook');
const Note = require('../models/note');

exports.getNote = async (req, res) => {
    try {
        const userId = req.user.id;
        const notes = await Note.findAll({
            where: { UserId: userId },
            attributes: [ 'BookId', 'title', 'content' ],
        });
        return res.json({
            message: '메모를 불러옵니다.',
            success: true,
            data: notes,
        });
    } catch (error) {
        console.error(error);
        return res.json({
            message: '메모 목록을 불러오는 과정에서 오류가 발생했습니다.',
            success: false,
        });
    };
};

exports.postNote = async (req, res) => {
    try {
        const userId = req.user.id;
        const { bookId, title, content } = req.body;
        const book = await UserBook.findOne({ where: { userId, bookId, status: 'read' }});
        if (!book) {
            return res.json({
                message: '다 읽은 책에 대한 메모만 작성할 수 있습니다.',
                success: false,
            });
        };
        const [note, created] = await Note.findOrCreate({
            where: { UserId: userId, BookId: bookId },
            defaults: { title, content },
        });
        if (!created) {
            return res.json({
                message: '이미 해당 책에 대한 메모가 있습니다.',
                success: false,
            });
        };
        return res.json({
            message: '메모를 게시했습니다.',
            success: true,
        });
    } catch (error) {
        console.error(error);
        return res.json({
            message: '메모를 게시하는 과정에서 오류가 발생했습니다.',
            success: false,
        });
    };
};

exports.patchNote = async (req, res) => {
    try {
        const { bookId, title, content } = req.body;
        const [note] = await Note.update({ title, content }, { where: { BookId: bookId }});
        if (note === 0) {
            return res.json({
                message: '원본을 찾을 수 없어 메모를 수정할 수 없습니다..',
                success: false,
            });
        };
        return res.json({
            message: '메모를 수정했습니다.',
            success: true,
        });
    } catch (error) {
        console.error(error);
        return res.json({
            message: '메모를 수정하는 과정에서 오류가 발생했습니다.',
            success: false,
        });
    ;}
};

exports.deleteNote = async (req, res) => {
    try {
        const { bookId } = req.body;
        const deleted = await Note.destroy({ where: { BookId: bookId }});
        if (deleted === 0) {
            return res.json({
                message: '원본을 찾을 수 없어 메모를 삭제할 수 없습니다.',
                success: false,
            });
        };
        return res.json({
            message: '메모를 삭제했습니다.',
            success: true,
        });
    } catch (error) {
        console.error(error);
        return res.json({
            message: '메모를 삭제하는 과정에서 오류가 발생했습니다.',
            success: false,
        });
    };
};