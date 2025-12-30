const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const santaController = require('../controllers/santaController');


router.get('/', (req, res) => {
    res.render('home', { user: req.session.userId });
});

router.get('/login', (req, res) => {
    res.render('login');
});

router.get('/register', (req, res) => {
    res.render('register');
});

router.get('/wish', userController.isAuth, (req, res) => {
    res.render('wish');
});

router.get('/chat', userController.isAuth, (req, res) => {
    res.render('chat');
});


router.post('/wish', userController.isAuth, santaController.submitWish);

router.post('/register', userController.registerUser);
router.post('/login', userController.loginUser);
router.get('/logout', userController.logout);

module.exports = router;
