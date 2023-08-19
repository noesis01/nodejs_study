var express = require('express');
var app = express();
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

app.get('/template', (req, res) => {
    res.render('temp');
});

app.listen(port, () => {
    console.log(`${port} connected!`);
});
