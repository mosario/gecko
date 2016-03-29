var path = require('path');
module.exports = {
    // entry: getEntrySources(['./src/js/entry.js']),
    // output: {
    //     publicPath: 'http://localhost:8080/',
    //     filename: 'build/bundle.js'
    // },
    entry: [
        path.join(__dirname, './js/app.js')
    ], 
    output: {
        path: path.join(__dirname, 'build/'),
        filename: 'bundle.js'
    }, 
    devtool: 'eval',
    module: {
        preLoaders: [
            {
                test: /\.jsx?$/,
                exclude: /(node_modules|bower_components)/,
                loader: 'source-map'
            }
        ],
        loaders: [
            {
                test: /\.jsx?$/,
                exclude: /(node_modules|bower_components)/,
                loaders: [
                    'react-hot',
                    'babel?stage=0'
                ]
            },
            {
                test: /\.css$/,
                loader: "style-loader!css-loader!postcss-loader"
            }
        ]
    },
    postcss: function () {
        return [require('autoprefixer'), require('precss')];
    }
};

function getEntrySources(sources) {
    if (process.env.NODE_ENV !== 'production') {
        sources.push('webpack-dev-server/client?http://localhost:8080');
        sources.push('webpack/hot/only-dev-server');
    }

    return sources;
}