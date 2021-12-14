const express = require('express');
const router = express.Router();

const userCommentCtrl = require('../controllers/comment');




router.get('/:id/comments', userCommentCtrl.getAllComments);
router.post('/:id/comment/', userCommentCtrl.newComment);
router.delete('/comment/:id', userCommentCtrl.deleteComment);

module.exports = router;