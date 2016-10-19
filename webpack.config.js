const NODE_ENV = process.env.NODE_ENV || 'development';

var ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
    context: __dirname + "/frontend",
    entry: './js/main.js',

    output: {
        filename: './templates/iview/public/js/scripts.js'
    },

    /*plugins: NODE_ENV === 'production' ? [
     new webpack.optimize.UglifyJsPlugin({
     compress: {
     warnings: false,
     drop_console: true,
     unsafe: true
     }
     })
     ] : [
     new CopyWebpackPlugin([{
     from: './dev/index.html', to: './dist/index.html'
     },{
     from: './dev/css/style.css', to: './dist/css/style.css'
     }])
     ],*/

    plugins: [
        new ExtractTextPlugin('./templates/iview/public/css/style.css', {
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