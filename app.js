const express = require('express')
const nunjucks = require('nunjucks')
const app = express() ;

const project = {
    title: 'dvcxxx',
    type: 'simplemap'
}

const PATH_TO_TEMPLATES = '.' ;
nunjucks.configure(PATH_TO_TEMPLATES, {
    autoescape: true,
    watch: true,
    express: app
});

app.use(express.static(__dirname + '/public'));

app.get('/', function(req, res) {
    return res.render(`./templates/${project.type}/index.njk`, project);
});

app.listen(3000);
