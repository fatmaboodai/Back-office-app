const mysql = require("mysql2")

const connectionDB = mysql.createConnection({
    // pass host , database , user , password
host: 'localhost',
database: 'bank_app',
user:'root',
password:'fatma@2001$_'
})



// export the connection 
module.exports = connectionDB;