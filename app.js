var express = require('express');
var path = require('path');
var logger = require('morgan');
var bodyParser = require('body-parser');
var api = require('./routes/api');

var app = express();


app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

//We do this, otherwise there is some weird caching that breaks and returns a 304
app.disable('etag');


app.get('/', function(req, res, next){
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.use('/api', api);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handlers
//================
// development error handler
// will print stacktrace
if (app.get('env') !== 'development') {
    app.use(function(err, req, res, next) {
        res.status(err.status || 500);
        res.send('error'+ err.message );
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.sendFile(path.join(__dirname, "public", "404.html"));
});


module.exports = app;
