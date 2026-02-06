const { Sequelize } = require('sequelize');
// pass host , database , user , password

const sequelizeConnectionDB = new Sequelize('bank_app', 'postgres', '12345', {
    host: 'localhost',
    dialect: 'postgres',  // Change from 'mysql' to 'postgres'
    port: 5432,           // Default PostgreSQL port
    logging: false        // Set to true if you want to see SQL logs
});


// export the connection 

module.exports = sequelizeConnectionDB;
