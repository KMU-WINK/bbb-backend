const express = require('express');
const router = express.Router();
const { renderMain, renderUser, renderBooks, renderBookshelf, renderNotes, renderReview, renderProfile } = require('../controllers/page');

router.get('/', renderMain);
router.get('/user', renderUser);
router.get('/books', renderBooks);
router.get('/bookshelf', renderBookshelf);
router.get('/notes', renderNotes);
router.get('/reviews', renderReview);
router.get('/profile', renderProfile);

module.exports = router;