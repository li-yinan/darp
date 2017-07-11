/**
 * @file webpack配置
 * @author liyinan
 */

// import {join} from 'path';
var join = require('path').join;

const PROJECT_ROOT = join(__dirname, '../web');

module.exports = {
    entry: {
        'live': join(__dirname, 'index.js')
    },
    output: {
        path: join(__dirname, '../web'),
        filename: '[name].js',
        publicPath: '/'
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                use: 'babel-loader',
                exclude: /node_modules/,
                options: {
                    presets: ['env']
                }
            },
            {
                test: /\.less$/,
                use: [{
                    loader: "style-loader"
                }, {
                    loader: "css-loader"
                }, {
                    loader: "less-loader"
                }]
            }
        ]
    },
    devtool: '#source-map'
};
