const express = require('express');
const bodyParser = require('body-parser');
const follow = require('./follow');
const pug = require('pug');
const app = express();
const server  = app.listen(3000, () => console.log('Example app listening on port 3000!'))
const io = require('socket.io')(server);

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json())
app.set('view engine','pug');

app.get('/', (req, res) => {
    res.render('index');
});

app.post('/follow', function (req, res) {
    console.log(req.body.account);
    res.status(204).send();
    follow(req.body.account, io);
  })

  io.on('connection', function (socket) {
    console.log('client connected');
    socket.emit('friendship_result', { result: 'Connection established' });
});