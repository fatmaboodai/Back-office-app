const express = require('express');
const mysql = require('mysql2');
const app = express();
const connectionDB =  require('./database')





app.get('/',function(req,res){
   
    connectionDB.query('SELECT * FROM Customers',function(err,result){
        if(err) throw err;
        // print the data retrived 
        res.send(result)
    });
})





app.listen(5000, function(){
    console.log('App listening on port 5000');
    connectionDB.connect(function(err){
        // if there is an error 
        if(err) throw err;
        // else console log the connection status
        console.log('Connected to the database');
    })
});