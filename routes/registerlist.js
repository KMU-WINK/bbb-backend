const express = require('express');
const { showRegisterlist, addToRegisterlist } = require('../controllers/registerlist');
const { isLoggedIn } = require('../middlewares');
const router = express.Router();

// GET /registerlist
router.get('/', isLoggedIn, showRegisterlist);
// POST /registerlist
router.post('/', isLoggedIn, addToRegisterlist);

module.exports = router;