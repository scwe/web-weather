const path = require('path');
const webpack = require('webpack');

var PROD = (process.env.NODE_ENV === 'production')

var plugins = [
    new webpack.DefinePlugin({
        'process.env': {
            'NODE_ENV': JSON.stringify(process.env.NODE_ENV)
        }
    })
]

if(PROD){
    plugins.push(new webpack.optimize.UglifyJsPlugin({
        compress: { warnings: false }
    }));
}

module.exports = {
    entry: "./public/js/app.js",
    output: {
        path: __dirname,
        filename: "./public/bundle.js"
    },
    plugins: plugins,
    module: {
        loaders: [
            {test : /\.css$/, loader: "style!css"},
            {test: /\.js$/, exclude: /node_modules/, loader: "babel-loader" },
            {test: /\.jsx$/, loader: "babel-loader" }
        ]
    }
};
