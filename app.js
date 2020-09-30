const express = require('express')
const nunjucks = require('nunjucks')
const app = express() ;

const PATH_TO_TEMPLATES = '.' ;
nunjucks.configure(PATH_TO_TEMPLATES, {
    autoescape: true,
    express: app
});

app.get('/', function(req, res) {
    return res.render('index.html');
});

app.listen(3000);
