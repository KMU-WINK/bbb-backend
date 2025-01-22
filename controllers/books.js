const Book = require('../models/book');
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