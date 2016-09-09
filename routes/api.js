var express = require('express');
var router = express.Router();


router.get('/weather', function(req, res, next){
    var names = req.query.names;
    res.json(names);
});

module.exports = router;
