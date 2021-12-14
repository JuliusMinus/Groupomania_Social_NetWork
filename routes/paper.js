const express = require('express');
const router = express.Router();
const auth = require("../middleware/auth");
const userPaperCtrl = require('../controllers/paper');
const multer = require('../middleware/multer-config');

router.get('/', auth, multer, userPaperCtrl.getAllPapers);
router.post('/',auth ,multer, userPaperCtrl.newPaper);
router.get('/:id', auth ,multer, userPaperCtrl.getOnePaper);
router.put("/:id", auth,multer, userPaperCtrl.modifyOnePaper);
router.delete('/:id', auth ,multer, userPaperCtrl.deleteOnePaper);
router.get('/user:id/posts', auth ,multer, userPaperCtrl.getUserPapers);



module.exports = router;
