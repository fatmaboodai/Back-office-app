const  Customer  = require('../models/customer'); 


// Get all customers associated with a specific manager ID
exports.getAllCustomers = async (req, res) => {
    try {
        // Extract manager ID from request parameters
        const { ManagerID } = req.params;

        // Find all customers where managerId matches the specified ID
        const customers = await Customer.findAll({
            where: {
                ManagerID: ManagerID
            }
        });

        // Send JSON response with customers
        res.json(customers);
    } catch (err) {
        // Handle any errors and send error response
        res.status(500).json({ error: err.message });
    }
};

// Add a new customer to the database
exports.addCustomer = async (req, res) => {
    try {
        const { CustomerNumber, CustomerName, DateOfBirth, Gender, ManagerID } = req.body;
        if (!CustomerNumber || !CustomerName || !DateOfBirth || !Gender || !ManagerID) {
            return res.status(400).json({ error: 'All fields are required' });
        }
        const customer = await Customer.create({ CustomerNumber, CustomerName, DateOfBirth, Gender, ManagerID });
        res.status(201).json(customer);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Update an existing customer in the database
exports.updateCustomer = async (req, res) => {
    try {
        // Extract the customer ID from request 
        const { id } = req.params;
        // get the rest of the customer's info
        const { CustomerNumber, CustomerName, DateOfBirth, Gender, ManagerID } = req.body;

         // Update the customer in the database with the given ID
        await Customer.update({ CustomerNumber, CustomerName, DateOfBirth, Gender, ManagerID }, { where: { CustomerNumber: id } });
         // updated successfully
        res.json({ message: 'Customer updated successfully' });
    } catch (err) {
        // server error
        res.status(500).json({ error: err.message });
    }
};


// extra function for better design of the app 
// Delete a customer from the database
exports.deleteCustomer = async (req, res) => {
    try {
        // Extract the customer ID from request 
        const { id } = req.params;
        // Find the customer by ID
        const customer = await Customer.findByPk(id);

        // If customer does not exist, return 404 Not Found
        if (!customer) {
            return res.status(404).json({ error: 'Customer not found' });
        }

        // Delete the customer
        await customer.destroy();

        // Return success message
        res.json({ message: 'Customer deleted successfully' });
    } catch (err) {
        // server error
        res.status(500).json({ error: err.message });
    }
};