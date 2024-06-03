const express = require('express');
const router = express.Router();
const customerController = require('../controllers/customerController');

// Route to get all customers
router.get('/:ManagerID', customerController.getAllCustomers);

// Route to add a new customer
router.post('/add', customerController.addCustomer);

// Route to update an existing customer
router.put('/:id', customerController.updateCustomer);

// Route to delete a customer
router.delete('/:id', customerController.deleteCustomer);

module.exports = router;
