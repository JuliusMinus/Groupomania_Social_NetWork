const express = require('express');
const router = express.Router();


const userCtrl = require('../controllers/user');

router.post('/register', userCtrl.register);
router.post('/login', userCtrl.login);
router.get('/profile/:id', userCtrl.getUserProfile);
router.delete('/profile/:id/delete', userCtrl.deleteUserProfile);

module.exports = router;