const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const santaController = require('../controllers/santaController');

// All santa routes protected by isSanta
router.use(userController.isAuth, userController.isSanta);

router.get('/dashboard', santaController.getDashboard);
router.post('/memory', santaController.updateMemory);
router.get('/locations', santaController.getUserLocations);

module.exports = router;
