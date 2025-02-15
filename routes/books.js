const express = require('express');
const { search } = require('../controllers/books');
const router = express.Router();

// GET /books/search?query={keyword}
router.get('/search', search);

module.exports = router;
