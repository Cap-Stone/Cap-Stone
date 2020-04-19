const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const http = require('http');
const app = express();
const mongoose = require('mongoose');
// Add headers
app.use(function (req, res, next) {

    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:4200');

    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

    // Set to true if you need the website to include cookies in the requests sent

    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);

    // Pass to next layer of middleware
    next();
});

// Parsers
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));

// Angular DIST output folder
app.get('/test/', (req, res) => {
    console.log('What up');
    res.send({msg: 'Hello World'});
});

//Set Port
const port = process.env.PORT || '3000';
app.set('port', port);

const server = http.createServer(app);

server.listen(port, () => console.log(`Running on localhost:${port}`));


mongoose.connect('mongodb+srv://admin:admin@databasebenchmark-ga1yr.gcp.mongodb.net/test?retryWrites=true&w=majority', { useNewUrlParser: true , useUnifiedTopology: true});
const connection = mongoose.connection;
connection.on('error', (error) => {
  console.log('Error connecting to MongoDB', error);
});

connection.once('open', () => {
  console.log('Connected to MongoDB');
});