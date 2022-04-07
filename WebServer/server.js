var { v4: uuidv4 } = require('uuid');
var express = require('express');
var cors = require('cors');
var app = express();
var http = require('http').Server(app);

var mongoose = require('mongoose');
var authRoutes = require("./routes/authRoutes");
var transactionRoutes = require("./routes/transactionRoutes");
var cookieParser = require('cookie-parser');
var path = require('path');

app.use(express.static(__dirname + '/public'));
app.use(cors());
app.set('views', path.join(__dirname, 'views'));
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');

//middleware
app.use(express.json());
app.use(cookieParser());

//get and post requests for the database
const db = 'mongodb+srv://sigilai:123qwa@spybot.fu5ki.mongodb.net/spybot-auth';

mongoose.connect(db, {useNewUrlParser: true, useUnifiedTopology: true})
.then((result) => app.listen(7000))
.catch((err) => console.log(err));

app.use(authRoutes);
app.use(transactionRoutes);



http.listen(4000,function(){ // Listens to port 8081
    console.log('Listening on ' + http.address().port);
});