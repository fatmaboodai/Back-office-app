const express = require('express');
const router = express.Router();
const managerController = require('../controllers/managerController');

// Route to get all managers
router.get('/', managerController.getAllManagers);

// Route to get a manager by ID
router.get('/:id', managerController.getManagerById);

// Route to add a new manager
router.post('/add', managerController.addManager);

module.exports = router;
