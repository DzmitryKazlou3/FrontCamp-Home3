/// <binding BeforeBuild='Run - Development' />
"use strict";

var webpack = require('webpack');

module.exports = {
    entry: "./Scripts/app.js",
    output: {
        path: process.env.NODE_ENV == 'development' ? __dirname + "/build/js" : __dirname + "/../../js",
        filename: "[name].min.js",
        publicPath: process.env.NODE_ENV == 'development' ? "js/" : "/FrontCamp-Home3/js/",
        chunkFilename: "[name].min.js"
    },
    devServer: {
        contentBase: "./build",
        host: "localhost",
        port: 9000
    },
    module: {
        loaders: [
            {
                test: /\.jsx?$/,
                exclude: /node_modules/,
                loader: "babel-loader"
            }
        ]
    },

    plugins: [
        new webpack.NoErrorsPlugin(),
        new webpack.EnvironmentPlugin(["NODE_ENV"])
    ],

    devtool: process.env.NODE_ENV == 'development' ? "eval" : "source-map",

    watchOptions: {
        aggregateTimeout: 300,
        poll: 1000,
        ignored: /node_modules/
    },

    watch: process.env.NODE_ENV == 'development'
};