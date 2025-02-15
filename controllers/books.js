const { kakaoSearch } = require('../utils/kakaoApi');

exports.search = async (req, res) => {
    const { query, page = 1, size = 10 } = req.query;
    if (!query) {
        return res.status(400).json({ 
            message: '검색어를 입력해 주세요.',
            success: false,
        });
    }
    try {
        const books = await kakaoSearch(query, { page, size });
        if (!books || books.documents.length === 0) {
            return res.status(404).json({ 
                message: '검색된 책이 없습니다.',
                success: false,
            });
        }
        return res.json({ 
            message: '책을 찾았습니다.',
            success: true, 
            data: books 
        });
    } catch (err) {
        res.status(500).json({ 
            message: '책을 가져올 수 없습니다.',
            success: false,
        });
    }
}