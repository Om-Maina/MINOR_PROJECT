const express = require('express')
const userService = require('../service/userService')
const auth = require('../middleware/Auth');
const errors = require('../errors/errors');
const upload = require('../middleware/avatar');

const router = new express.Router();

//User Routes
router.post('/users/signup', userService.createUsers);
router.post('/users/login', userService.login);
router.get('/users/me', auth, userService.getMyprofile);
router.post('/users/logout', auth, userService.logout);
router.post('/users/logoutAll', auth, userService.logoutAll);
router.delete('/users/me', auth, userService.deleteUser);
router.patch('/users/me', auth, userService.updateUser);
router.post('/users/me/avatar', auth, upload.single('avatar'), 
userService.uploadProfileImage, errors.uploadProfileImageError)
router.get('/users/:id/avatar', userService.getProfileImage)
router.delete('/users/me/avatar', auth, userService.deleteProfileImage)

router.get('/users', userService.getUsers);
router.get('/users/:id', userService.getUserById);

module.exports = router;