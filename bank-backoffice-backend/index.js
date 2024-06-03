const express = require('express');
const app = express();
const sequelizeConnectionDB = require('./database');
const Manager = require('./models/manager');
const Customer = require('./models/customer');
const customerRouter = require('./routes/customer');
const managerRouter = require('./routes/manager');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');


app.use(express.json());

app.use('/customers', customerRouter);
app.use('/managers', managerRouter);
// Start the server and connect to the database
app.listen(5000, async function() {
    console.log('App listening on port 5000');
    try {
        await sequelizeConnectionDB.authenticate();
        console.log('Connection has been established successfully.');

        // Synchronize the models with the database
        await sequelizeConnectionDB.sync({ alter: true });
        console.log('Database synchronized successfully.');
    } catch (error) {
        console.error('Unable to connect to the database:', error);
    }
});