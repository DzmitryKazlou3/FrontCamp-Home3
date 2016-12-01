/// <binding BeforeBuild='Run - Development' />
"use strict";

var webpack = require('webpack');
var ExtractTextPlugin = require("extract-text-webpack-plugin");
var devMode = process.env.NODE_ENV == 'development';
var path = require('path');

module.exports = {
    entry: {
        main: "./Scripts/app.js",
        test: "./Custom loader/test.json"
    },
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
                include: [
                    path.resolve(__dirname, "Scripts"),
                    path.resolve(__dirname, "Custom loader")
                ],
                loader: "babel-loader"
            },
            {
                test: /\.less$/,
                include: [
                    path.resolve(__dirname, "Styles")
                ],
                loader: ExtractTextPlugin.extract({ fallbackLoader: 'style-loader', loader: 'css-loader!postcss-loader!less-loader' })
            },
            {
                test: /\.json$/,
                include: [
                    path.resolve(__dirname, "Custom loader")
                ],
                loader: "./Custom loader/zlov-loader"
            }
        ]
    },

    plugins: [
        new webpack.NoErrorsPlugin(),
        new webpack.EnvironmentPlugin(["NODE_ENV"]),
        new ExtractTextPlugin({ filename: "../Styles/[name].css", disable: false, allChunks: true})
    ],

    devtool: devMode ? "source-map" : "source-map",

    watchOptions: {
        aggregateTimeout: 300,
        poll: 1000,
        ignored: /node_modules/
    },

    watch: devMode
};