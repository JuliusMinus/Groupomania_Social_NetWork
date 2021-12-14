const express = require('express');
const router = express.Router();

const userPaperCtrl = require('../controllers/paper');
const multer = require('../middleware/mutler-config');

router.get('/',multer, userPaperCtrl.getAllPapers);
router.post('/',multer, userPaperCtrl.newPaper);
router.get('/:id', multer, userPaperCtrl.getOnePaper);
router.delete('/:id',multer, userPaperCtrl.deleteOnePaper);
router.get('/user:id/posts',multer, userPaperCtrl.getUserPapers);



module.exports = router;
