"use strict";
(function() {

    const express = require("express");
    const app = express();

    var fs = require("fs");

    const bodyParser = require('body-parser');
    const jsonParser = bodyParser.json();

    app.use(function(req, res, next) {
        res.header("Access-Control-Allow-Origin", "*");
        res.header("Access-Control-Allow-Headers", 
                    "Origin, X-Requested-With, Content-Type, Accept");
        next();
    });

    app.use(express.static('public'));

    app.get('/', function(req, res) {
        res.header("Access-Control-Allow-Origin", "*");
        let json = {"breweries": req.body};
        fs.writeFile("breweries.txt", json.breweries, function(err){
        	if (err){ 
        		return console.log(err);
        	}
        	console.log("File updated.");
        });
        res.send(JSON.stringify(json));

    });

    // app.post('/', jsonParser, function(req, res) {
    // 	res.header("Access-Control-Allow-Origin", "*");
    // 	fs.writeFile("breweries.txt", req.body, function(err) {
    // 		if (err){
    // 			return console.log(err);
    // 		}
    // 		res.send("File updated.");
    // 	})
    // })
    app.listen(3000);
})();