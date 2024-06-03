const express = require('express');
const router = express.Router();
const managerController = require('../controllers/managerController');

// Route to get all managers
router.get('/', managerController.getAllManagers);

// Route to get a manager by ID
router.get('/:id', managerController.getManagerById);

// Route to register a new manager
router.post('/register', managerController.registerManager);

// Route to login a manager
router.post('/login', managerController.loginManager);

module.exports = router;
