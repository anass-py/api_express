const express = require('express');   
const mongoose = require('mongoose'); // mongodb base de données
const bodyParser = require('body-parser'); // parser en json 

const {Films, Client_searches} = require('./models/get'); 
const postsRoute = require('./routes/posts');

const app = express(); // object class express

// // //IMPORT MODULES


// create a midleware 
app.use(bodyParser.json()); // les données json parse automatiquement

app.use('/posts', postsRoute) // no need to use app.get('/post)

app.set('view engine', 'ejs')    // html



// listenning to the server

app.listen(3000); // 
