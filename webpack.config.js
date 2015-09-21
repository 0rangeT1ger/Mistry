/**
 * Created by wujianbo on 15/9/21.
 */
var __dirName = './',
    webpack = require('webpack');
module.exports = {
    entry: {
        main:__dirName+'devStatic/js/main/main.jsx'
    },
    output: {
        filename: __dirName+'static/js/[name]/[name].js'
    },
    module: {
        loaders:[
            { test: /\.css$/, loader: 'style-loader!css-loader' },
            { test: /\.jsx$/, loader: 'babel' }
        ]
    },
    plugins:[
        new webpack.optimize.UglifyJsPlugin({
            compress: {
                warnings: false
            }
        })
    ]
};