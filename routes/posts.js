const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const app = express();
//IMPORT MODULES

const {Films, Client_searches} = require('../models/get');

const urlencodedParser = bodyParser.urlencoded({extended: false})

app.set('view engine', 'ejs')

router.get("/index", (req, res) => {  
        res.render('index') // index is the html file 
    });

let new_search ;
let id = 1

router.post("/indoux",urlencodedParser, async (req, res) => {

        new_search = new Client_searches({
        title : req.body.titre,
        year : req.body.year,
        genres : req.body.genres
        });

console.log(new_search)

// save to database 

try {
        //const result = await new_search.save()
        //res.json(new_search)
        const films = await Films
                                        .find({year : req.body.year})
                                        .limit(10)
                                        .select({title:1, year:1, genres:1})   // 'title', year, 
                res.json(films) // repondre au client 

}catch (err) {
        res.json({message : err.message})
}

})

//**********************GETITING FILMS BY FILTRING  ************************/



//******************POSTING A SINGLE FILM  **********************/
router.post('/', async (req, res) => {
        const film = new Films({
                title : req.body.title,
                year : req.body.year,
                tags : req.body.tags,
                genres : req.body.genres
        })
        //console.log(result)
        try {
                const result = await film.save()
                res.json(result)
                console.log(result)
        }catch(err){
                res.json({message : err.message})
        }
})


//****************DELETING FILMS BY ID  *********************/
router.delete('/:postID', async (req, res) => {
        try {
                const deletedFilm = await Films.remove({_id : req.params.postID}); 
                res.json(deletedFilm)
                console.log(deletedFilm)

        }catch(err){
                res.json({message : err.message})
        }
})

router.get(('/getData'), async (req, res) => {
        try {
                const courses = await Films
                
            .find({genres : 'Action'})
            .limit(10)
            .sort({year : 1})
            .select({title:1, year:1, genres:1})
            
            res.send(courses)
        }catch (err){
                res.json({message : err.message})
        }
        
    });

router.get(('/getDataID/:postID'), async (req, res) => {
        try {
                const courses = await Films
                .find({_id : req.params.postID})
                .select({title:1, year:1, genres:1})
         
            res.send(courses)
        }catch (err){
                res.json({message : err.message})
        }      
    });

//****************UPDATING A FILM ****************************/
router.patch('/:postID', async (req, res) => {
        try {
                const updatedFilm = await Films.updateOne(
                        {_id : req.params.postID},
                        {$set : {title : req.body.title}});
        }catch(err){
                res.json({message : err.message});
        }
})


//*******************EXPORTING THE ROUTER *************************/
module.exports = router; 
