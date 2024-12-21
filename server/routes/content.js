const express = require('express');
const {
    getAllContent,
    getAdminContent,
    getContent,
    createContent,
    updateContent,
    deleteContent
} = require('../controllers/contentController');

const router = express.Router();

const { protect } = require('../middlewares/auth');

router
    .route('/')
    .get(getAllContent)
    .post(protect, createContent);

router.get('/all', protect, getAdminContent);

router
    .route('/:id')
    .get(getContent)
    .put(protect, updateContent)
    .delete(protect, deleteContent);

module.exports = router;
