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
    res.render('new');
});

app.post('/topic', (req, res) => {
    var title = req.body.title
    var des = req.body.description;
    fs.writeFile('./data/'+title, des, (err) => {
        if(err){
            res.status(500).send('Internal server Error');
        }
        res.send('Success!');
    });
});

app.listen(port, () => {
    console.log(`Connected to ${port}!`);
});

