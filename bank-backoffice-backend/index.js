const express = require('express');
const app = express();
const sequelizeConnectionDB =  require('./database')
const Manager = require('./models/manager');
const Customer = require('./models/customer');

module.exports = { Manager, Customer };



app.get('/', async (req, res) => {
    try {
        // Retrieve all customers using Sequelize model method
        const customers = await Customer.findAll();
        // Send the retrieved data as a response
        res.json(customers);
    } catch (error) {
        console.error('Error retrieving customers:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});



app.listen(5000, async function(){
    console.log('App listening on port 5000');
    try {
        await sequelizeConnectionDB.authenticate();
        console.log('Connection has been established successfully.');
      } catch (error) {
        console.error('Unable to connect to the database:', error);
      }
});