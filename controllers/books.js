const Book = require('../models/book');
const UserBook = require('../models/userbooks');
const { searchBooks, searchABook } = require('../utils/kakaoApi');

exports.search = async (req, res) => {
    const { query, page = 1, size = 10 } = req.query;
    if (!query) {
        return res.status(400).json({ error: '검색어를 입력해 주세요.' });
    }
    try {
        const books = await searchBooks(query, { page, size });
        if (!books || books.documents.length === 0) {
            return res.status(404).json({ error: '검색된 책이 없습니다.' });
        }
        res.json({ success: true, data: books });
    } catch (err) {
        res.status(500).json({ error: '책을 가져올 수 없습니다.' });
    }
};

exports.detail = async (req, res) => {
    const { query, target = isbn } = req.params;
    try {
        const book = await searchABook(query, target);
        if (!book) {
            return res.status(404).json({ error: '책을 찾을 수 없습니다.' });
        }
        res.json({ success: true, data: book });
    } catch (err) {
        res.status(500).json({ error: '책을 가져올 수 없습니다.' });
    }
};

exports.wish = async (req, res) => {
    const { isbn } = req.params;
    const { userId } = req.body;
    try {
        const [book] = await Book.findOrCreate({ where: { isbn } });
        const [userBook, created] = await UserBook.findOrCreate({
            where: { userId, bookId: book.id },
            defaults: { status: 'to-read' },
        });
        if (!created) {
            return res.status(400).json({ message: '이미 찜한 책입니다.' });
        }
        res.status(201).json({ message: '찜 목록에 추가했습니다.', userBook });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: '책을 찜할 수 없습니다. 다시 시도해 주세요.' });
    }
}

exports.register = async (req, res) => {
    const { isbn } = req.params;
    const { userId } = req.body;
    try {
        const [book] = await Book.findOrCreate({ where: { isbn } });
        const [userBook, created] = await userBook.findOrCreate({
            where: { userId, bookId: book.id },
            default: { status: 'reading' },
        });
        if (!created) {
            return res.status(400).json({ message: '이미 등록된 책입니다.' });
        };
        res.status(201).json({ message: '정상적으로 책을 등록했습니다.', userBook });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: '책을 등록할 수 없습니다. 다시 시도해 주세요. '});
    }
}