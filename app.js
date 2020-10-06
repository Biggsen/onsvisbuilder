const express = require('express')
const nunjucks = require('nunjucks')
const app = express()
var config = require('./config')
var assets = require('./config/assets')

const PATH_TO_TEMPLATES = '.' ;
nunjucks.configure(PATH_TO_TEMPLATES, {
    autoescape: true,
    watch: true,
    express: app
});

app.use(express.static(__dirname + '/public'));

app.get('/', function(req, res) {
    return res.render(`./templates/${config.project.type}/index.njk`, assets[config.project.type]);
});

app.listen(3000);
