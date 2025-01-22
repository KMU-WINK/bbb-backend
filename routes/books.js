const express = require('express');
const { search, searchById } = require('../controllers/books');
const router = express.Router();

// GET /books/search
router.get('/search', search);
// GET /books/:isbn
router.get('/:isbn', detail);

module.exports = router;
