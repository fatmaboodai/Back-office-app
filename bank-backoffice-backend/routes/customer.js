// const express = require('express');
// const router = express.Router();
// const customerController = require('../controllers/customerController');

// // Route to get all customers
// router.get('/:ManagerID', customerController.getAllCustomers);

// // Route to add a new customer
// router.post('/add', customerController.addCustomer);

// // Route to update an existing customer
// router.put('/:id', customerController.updateCustomer);

// // Route to delete a customer
// router.delete('/:id', customerController.deleteCustomer);

// module.exports = router;

const express = require('express');
const router = express.Router();
const verifyToken = require('../middleware/verifyToken');
const customerController = require('../controllers/customerController');

// Route to get all customers for a specific manager
router.get('/:ManagerID',verifyToken, customerController.getAllCustomersForM);

router.get('/:id',verifyToken, customerController.getOneCustomr);

// Route to get all customers for a specific manager
router.get('/',verifyToken, customerController.getAllCustomers);

// Route to add a new customer for a specific manager
router.post('/add', verifyToken, customerController.addCustomer);

// Route to update an existing customer (for the manager who created it)
router.put('/:id', verifyToken, customerController.updateCustomer);

// Route to delete a customer (for the manager who created it)
router.delete('/:id', verifyToken, customerController.deleteCustomer);


module.exports = router;
