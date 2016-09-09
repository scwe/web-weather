module.exports = {
    entry: "./public/js/app.js",
    output: {
        path: __dirname,
        filename: "./public/bundle.js"
    },
    module: {
        loaders: [
            {test : /\.css$/, loader: "style!css"},
            {test: /\.js$/, exclude: /node_modules/, loader: "babel-loader" },
            {test: /\.jsx$/, loader: "babel-loader" }
        ]
    }
};
