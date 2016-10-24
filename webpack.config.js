const NODE_ENV = process.env.NODE_ENV || 'development';
const webpack = require('webpack');
var ExtractTextPlugin = require('extract-text-webpack-plugin');

console.log(NODE_ENV);

module.exports = {
    context: __dirname + "/frontend",
    entry: './js/main.js',

    output: {
        path: __dirname + "/templates/iview/public/",
        filename: './js/scripts.js'
    },

    plugins: NODE_ENV === 'production' ? [
        new webpack.optimize.UglifyJsPlugin({
            compress: {
                warnings: false
            }
        }),
        new ExtractTextPlugin('./css/style.css', {
            allChunks: true
        })
    ] : [
        new ExtractTextPlugin('./css/style.css', {
            allChunks: true
        })
    ],

    module: {
        loaders: [
            { test: /\.js$/, loader: "babel?presets[]=es2015" },
            {
                test: /\.scss$/,
                loader: ExtractTextPlugin.extract('css!sass')
            },
            {
                test: /\.(eot|woff|woff2|ttf|svg|png|gif|jpg)$/,
                loader: 'url-loader?limit=30000&name=[name]-[hash].[ext]'
            }
        ]
    },

    watch: NODE_ENV === 'development',

    watchOptions: {
        aggregateTimeout: 100
    },

    devtool: NODE_ENV === 'development' ? 'eval' : null
};