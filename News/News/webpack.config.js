/// <binding BeforeBuild='Run - Development' />
"use strict";

var webpack = require('webpack');
var ExtractTextPlugin = require("extract-text-webpack-plugin");
var devMode = process.env.NODE_ENV == 'development';

module.exports = {
    entry: "./Scripts/app.js",
    output: {
        path: devMode ? __dirname + "/build/js" : __dirname + "/../../js",
        filename: "[name].min.js",
        publicPath: devMode ? "js/" : "/FrontCamp-Home3/js/",
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
            },
            {
                test: /\.less$/,
                loader: ExtractTextPlugin.extract("style-loader", "css-loader!autoprefixer-loader!less-loader")
            }
        ]
    },

    plugins: [
        new webpack.NoErrorsPlugin(),
        new webpack.EnvironmentPlugin(["NODE_ENV"]),
        new ExtractTextPlugin("../Styles/[name].css", { allChunks: true})
    ],

    devtool: devMode ? "eval" : "source-map",

    watchOptions: {
        aggregateTimeout: 300,
        poll: 1000,
        ignored: /node_modules/
    },

    watch: devMode
};