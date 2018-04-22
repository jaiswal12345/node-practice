
const express  = require('express');
const path = require('path');

const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/nodekb');

const app = express(); 
let db = mongoose.connection;
db.once('open',function(){
    console.log('connection establihsed');
});
db.on('error',function(error){
    console.log('Connection error');
});

let Article = require('./models/article');

app.get('/', function(req, res){
    db.collection('article').find({}).limit(3).toArray(function(err,result){
        res.send(result);
    })
});
var data ={
    title:"ramesh",
    author:"piyush",
    body:"this is article 3"
};


app.get('/insertvalue',function(req,res){
    var art = new Article(data);
    art.save( function(error, data){
        if(error){
            res.json(error);
        }
        else{
            res.json(data);
        }
    });
});
app.get('/fetchValues',function(req,res){
    Article.find({}, function(error, data){
        console.log(data);
        res.json(data);
    });
});

app.get

app.listen(3000, function(){
    console.log('Server started on port 3000...');
});