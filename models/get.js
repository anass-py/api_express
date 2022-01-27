const mongoose = require('mongoose');
//require('dotenv/config')

// CONNECT TO DATABASE 
mongoose.connect("mongodb://localhost/project_film")
    .then(() => console.log('connected to mongoDB...'))
    .catch(err =>console.log('could not connect to mongoDB', err.message))

// create a schema object for films collection database film json acces libre 
const filmSchema = new mongoose.Schema({
    title : String,
    year  :Number,
    genres : [ String ],
    cast : [ String ]    
});


// create a schema object for client_search collection
const clientSearchSchema = new mongoose.Schema({
    title : String,
    year  :Number,
    genres : [ String ],
      
});

// model the schema object 
const Films = mongoose.model('films', filmSchema)
const Client_searches = mongoose.model('client_searches', filmSchema)

module.exports = {
    Films, Client_searches
}



