var express = require('express');
var bodyParser = require('body-parser');

var app = express();
var api = require('./routes/favorito');

app.use(bodyParser.urlencoded({extends:false}));
app.use(bodyParser.json()); 

app.use((req, res, next) =>{
											 //Puede ser una url cualquiera
	res.header('Access-Control-Allow-Origin', '*');
	res.header('Access-Control-Allow-Headers', 'X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Request-Method');
	res.header('Access-Control-Allow-Methods', 'GET, POST, OPTION, PUT, DELETE');
	res.header('Allow', 'GET, POST, OPTION, PUT, DELETE');

	next();
});

app.use('/api', api );
							// function(req, res)

module.exports = app;
