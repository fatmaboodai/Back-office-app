const  Manager  = require('../models/manager'); // Import Sequelize Customer model
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

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





exports.registerManager = async (req, res) => {
    try {
        const { ManagerName, Email, Password } = req.body;

        // Check if the email already exists in the database
        const existingManager = await Manager.findOne({ where: { Email } });
        if (existingManager) {
            return res.status(400).json({ error: 'Email already exists' });
        }

        // Check if password is provided
        if (!Password) {
            return res.status(400).json({ error: 'Password is required' });
        }

        // Hash the provided password
        const hashedPassword = await bcrypt.hash(Password, 10); // Using 10 salt rounds

        // Create a new manager instance with hashed password
        const newManager = await Manager.create({
            ManagerName,
            Email,
            password: hashedPassword
        });

        // Send success response with newly created manager data
        res.status(201).json({
            message: 'Manager registered successfully',
            manager: newManager
        });
    } catch (error) {
        console.error('Error registering manager:', error);
        res.status(500).json({ error: 'An error occurred while registering manager' });
    }
};

exports.loginManager = async (req, res) => {
    try {
        const { Email, Password } = req.body;

        // Find manager by email
        const manager = await Manager.findOne({ where: { Email } });

        // If manager not found, return error
        if (!manager) {
            return res.status(401).json({ error: 'Invalid email or password' });
        }

        // Compare passwords
        const passwordMatch = await bcrypt.compare(Password, manager.password);

        // If passwords don't match, return error
        if (!passwordMatch) {
            return res.status(401).json({ error: 'Invalid email or password' });
        }

        // If passwords match, generate JWT token
        const token = jwt.sign({ id: manager.ManagerID, email: manager.Email }, 'mykeyFatma', { expiresIn: '1h' });

        // Send token to client
        res.json({ token, message: 'Logged in Successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
};
