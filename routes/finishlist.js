const express = require('express');
const { isLoggedIn } = require('../middlewares');
const { showFinishlist, addToFinishlist, deleteFinishlist } = require('../controllers/finishlist');
const router = express.Router();

// GET /finishlist
router.get('/', isLoggedIn, showFinishlist);
// POST /finishlist
router.post('/', isLoggedIn, addToFinishlist);
// DELETE /finishlist
router.delete('/', isLoggedIn, deleteFinishlist);

module.exports = router;