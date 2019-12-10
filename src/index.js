const express = require ('express');
const cors = require ('cors');
const BDconnection = require('./config/BDconnection');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();

const server = require('http').Server(app);
const io = require('socket.io')(server);

BDconnection;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended:true }));

app.use(cors());

app.use ((req, res, next) => {
    req.io = io;
    next();
})

app.use('/files', express.static(path.resolve(__dirname, '..', 'images', 'resized')));
app.use(require('./routes/postRoutes'));
app.use(require('./routes/userRoutes'));
app.use(require('./routes/authRoutes.js')(express));

server.listen(process.env.PORT || 8080);