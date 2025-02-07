const express = require('express');
const { search, detail, wish, register } = require('../controllers/books');
const { isLoggedIn } = require('../middlewares');
const router = express.Router();

// GET /books/search
router.get('/search', search);
// GET /books/:isbn
router.get('/:isbn', detail);
// POST /books/:isbn/wish
router.post('/:isbn/wish', isLoggedIn, wish);
// POST /books/:isbn/register
router.post('/:isbn/register', isLoggedIn, register);

module.exports = router;
