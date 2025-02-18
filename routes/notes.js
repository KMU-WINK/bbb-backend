const express = require('express');
const { isLoggedIn } = require('../middlewares');
const { getNote, postNote, getANote, patchNote, deleteNote } = require('../controllers/notes');
const router = express.Router();

// GET /notes
router.get('/', isLoggedIn, getNote);
// POST /notes
router.post('/', isLoggedIn, postNote);
// PATCH /notes
router.patch('/', isLoggedIn, patchNote);
// DELETE /notes
router.delete('/', isLoggedIn, deleteNote);

module.exports = router;