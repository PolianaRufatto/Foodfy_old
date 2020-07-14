const express = require("express");
const nunjucks = require("nunjucks");
const data = require('./data')

const server = express();

server.use(express.static('public'));

server.set("view engine", "njk");

nunjucks.configure("views", {
    express:server
});

server.get('/', function(req,res){
    return res.render('home', {recipes: data});
});

server.get("/about", function(req, res) {
    return res.render('about');
});

server.get("/recipes", function(req, res) {
    return res.render('recipes', {recipes: data});
});

server.get("/recipes/:id", function (req, res) {
    const recipeId = req.params.id;
    const recipe = data[recipeId]; 
    
    if (!recipe) {
        return res.status(404).render('not-found');
    }
    return res.render('recipe', {recipe});
});

server.listen(5000, function() {
    console.log('server is running');
});