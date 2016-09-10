var express = require('express');
var YQL = require('yql');
var _ = require('underscore');
var fs = require('fs');
var path = require('path');
var Fuse = require('fuse.js');
var router = express.Router();

var cityData = JSON.parse(fs.readFileSync(path.join(__dirname, '..', 'data', 'cities_new.json')));
var citySearch = new Fuse(cityData.cities);

//The query in this function works regardless of whether you use
//A zip code or a name of the city
router.get('/weather', function(req, res, next){
    var names = req.query.names.split(',');
    if(names.length === 0){
        return res.json({});
    }

    var queryString = "SELECT * FROM weather.forecast WHERE woeid IN (SELECT woeid FROM geo.places(1) WHERE ";
    queryString += _.map(names, function(n){return "text=\""+n+"\"";}).join(" OR ") + ") and u=\"c\"";

    var query = new YQL(queryString);
    query.exec(function(error, response){
        res.json(response.query.results);
    });
});

router.get('/weather/:name', function(req, res, next){
    var query = new YQL(
        "SELECT * FROM weather.forecast WHERE woeid IN "+
        "(SELECT woeid FROM geo.places(1) WHERE text=\""+req.params.name+"\")"+
        " and u=\"c\"");
    
    query.exec(function(error, response){
        res.json(response.query.results);
    });
});

router.get('/cities', function(req, res, next){
    res.json(cityData);
});

router.get('/cities/:subname', function(req, res, next){
    var searchResults = _.map(citySearch.search(req.params.subname), function(index){
            return cityData.cities[index];
        });

    res.json(_.take(searchResults, req.query.max ? req.query.max : 10));
});

module.exports = router;
