var express = require('express');
var mysql = require('mysql2');
var app = express();

app.listen(5000, function(){
    console.log('App listening on port 5000');
});


app.get('/',function(req,res){
    res.send('Hello World');
})