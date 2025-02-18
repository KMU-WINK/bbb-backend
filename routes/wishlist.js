const express = require('express');
const { addToWishlist, showWishlist, deleteWishlist } = require('../controllers/wishlist');
const { isLoggedIn } = require('../middlewares');
const router = express.Router();

// GET /wishlist
router.get('/', isLoggedIn, showWishlist);
// POST /wishlist
router.post('/', isLoggedIn, addToWishlist);
// DELETE /wishlist
router.delete('/', isLoggedIn, deleteWishlist);

module.exports = router;