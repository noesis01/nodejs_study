var express = require('express');
var app = express();
var bodyParser = require('body-parser');
app.locals.pretty = true;

app.set('view engine', 'jade');
app.set('views','./views');

const port = 9000;
const host = '127.0.0.1';

app.use(express.static('public'));

app.get('/', (req, res) => {
    res.send('Hello Home Page');
});

app.get('/route', (req, res) => {
    res.send('nodejs router');
});

app.get('/topic/:id', (req, res) => {
    var topic = [
        'Javasciprt',
        'Nodejs',
        'Express'
    ];
    var output = `
    <a href="/topic?id=0">Javascript</a><br>
    <a href="/topic?id=1">Nodejs</a><br>
    <a href="/topic?id=2">Express</a><br>
    ${topic[req.params.id]}
    `;

    res.send(output);
});

app.get('/topic/:id/:mode', (req, res) => {
    res.send(req.params.id+','+req.params.mode)
});

app.get('/template', (req, res) => {
    res.render('temp', {time:Date(), _title:'Jade Template'});
});

app.get('/form', (req, res) => {
    res.render('form');
});

// app.get('/form_receiver', (req, res) => {
//     var title = req.query.title;
//     var description = req.query.description;
//     res.send(title + ',' + description);
// });

app.post('/form_receiver', (req, res) => {
    var title = req.body.title;
    var des = req.body.description;

    res.send(title + ',' + des);
});


app.listen(port, () => {
    console.log(`${port} connected!`);
});
