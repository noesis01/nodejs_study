var express = require('express');
var app = express();
app.set('view engine', 'jade');
app.set('views','./views_file');
var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({extended: false}));
app.locals.pretty = true;

var fs = require('fs');

const port = 8880;

app.get('/topic/new', (req, res) => {
    fs.readdir('data', (err, files) =>{
        if(err){
            console.log(err);
            res.status(500).send('Internal Server Error');
        }
    res.render('new', {topics:files});
});
});

app.get(['/topic','/topic/:id'], (req, res) => {
    fs.readdir('data', (err, files) =>{
        if(err){
            console.log(err);
            res.status(500).send('Internal Server Error');
        }
        var id = req.params.id;
        if(id) {
        fs.readFile('./data/'+id, 'utf8',(err, data) => {
            if(err){
                console.log(err);
                res.status(500).send('Internal Server Error');
            }
            var text = data;
            res.render('view', {topics:files, title:id, des:text});
        });
        }
        else {
        res.render('view', {topics:files, title:'Welcome', des:'Hello, Nodejs'});
        }
    });
});

app.post('/topic', (req, res) => {
    var title = req.body.title
    var des = req.body.description;
    fs.writeFile('./data/'+title, des, (err) => {
        if(err){
            console.log(err);
            res.status(500).send('Internal server Error');
        }
        res.redirect('/topic/'+title);
    });
});

app.listen(port, () => {
    console.log(`Connected to ${port}!`);
});

