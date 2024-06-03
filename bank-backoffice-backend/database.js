const { Sequelize } = require('sequelize');
// pass host , database , user , password

const sequelizeConnectionDB = new Sequelize('bank_app', 'root', 'fatma@2001$_', {
    host: 'localhost',
    dialect: 'mysql'
});


// export the connection 

module.exports = sequelizeConnectionDB;
