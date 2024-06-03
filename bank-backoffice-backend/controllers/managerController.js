const  Manager  = require('../models/manager'); // Import Sequelize Customer model

// Get all managers from the database
exports.getAllManagers = async (req, res) => {
    try {
        const managers = await Manager.findAll(); // Retrieve all managers
        res.json(managers); // Send JSON response with managers
    } catch (err) {
        res.status(500).json({ error: err.message }); // Handle any errors and send error response
    }
};


// Get a manager by ID from the database
exports.getManagerById = async (req, res) => {
    try {
        const { id } = req.params; // Extract manager ID from request parameters
        const manager = await Manager.findByPk(id); // Find manager by ID
        if (!manager) {
            return res.status(404).json({ error: 'Manager not found' }); // If manager does not exist, return 404 Not Found
        }
        res.json(manager); // Send JSON response with manager
    } catch (err) {
        res.status(500).json({ error: err.message }); // Handle any errors and send error response
    }
};


// Add a new manager to the database
exports.addManager = async (req, res) => {
    try {
        const { ManagerName, Email } = req.body; // Extract manager data from request body
        const manager = await Manager.create({ ManagerName, Email }); // Create new manager in the database
        res.status(201).json(manager); // Send JSON response with newly created manager
    } catch (err) {
        res.status(500).json({ error: err.message }); // Handle any errors and send error response
    }
};