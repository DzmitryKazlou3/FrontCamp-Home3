/// <binding BeforeBuild='Run - Development' />
"use strict";

var webpack = require('webpack');

module.exports = {
    entry: "./Scripts/app.js",
    output: {
        filename: "./app-min.js"
    },
    devServer: {
        contentBase: ".",
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