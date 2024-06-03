const { Customer } = require('../models/customer'); // Import Sequelize Customer model


// Get all customers from the database
exports.getAllCustomers = async (req, res) => {
    try {
        // pass the manager's data while getting the customers
        const customers = await Customer.findAll({ include: 'Manager' }); 
        res.json(customers);
    } catch (err) {
        //  server error
        res.status(500).json({ error: err.message });
    }
};



// Add a new customer to the database
exports.addCustomer = async (req, res) => {
    try {
        // assign all the data coming from the req.body to vars
        const { CustomerNumber, CustomerName, DateOfBirth, Gender, ManagerID } = req.body;
        // create a new customer
        const customer = await Customer.create({ CustomerNumber, CustomerName, DateOfBirth, Gender, ManagerID });
        // created successfully
        res.status(201).json(customer);
    } catch (err) {
        //  server error 
        res.status(500).json({ error: err.message });
    }
};

// Update an existing customer in the database
exports.updateCustomer = async (req, res) => {
    try {
        const { id } = req.params;
        const { CustomerNumber, CustomerName, DateOfBirth, Gender, ManagerID } = req.body;
        await Customer.update({ CustomerNumber, CustomerName, DateOfBirth, Gender, ManagerID }, { where: { CustomerID: id } });
        res.json({ message: 'Customer updated successfully' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

