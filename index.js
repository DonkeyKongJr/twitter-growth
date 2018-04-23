const express = require('express');
const bodyParser = require('body-parser');
const follow = require('./follow');
var pug = require('pug');
const app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json())
app.set('view engine','pug');



app.get('/', (req, res) => {
    res.render('index');
});

app.post('/follow', function (req, res) {
    console.log(req.body.account);
    res.send(`Start following the follower of ${req.body.account}`);
    follow(req.body.account);
  })

app.listen(3000, () => console.log('Example app listening on port 3000!'))