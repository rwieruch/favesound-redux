var webpack = require('webpack');

module.exports = {
    entry: {
        main: './src/index.jsx'
    },
    resolve: {
      extensions: ['', '.js', '.jsx']
    },
    output: {
        path: __dirname + '/dist',
        publicPath: '/',
        filename: 'bundle.js'
    },
    module: {
        loaders: [{
          test: /\.jsx?$/,
          exclude: /node_modules/,
          loader: 'react-hot!babel'
        },
        {
          test: /\.scss$/,
          loader: 'style!css!sass'
        }]
    },
    plugins: [
        new webpack.ProvidePlugin({
          'fetch': 'imports?this=>global!exports?global.fetch!whatwg-fetch'
        }),
        new webpack.DefinePlugin({
          'process.env': {
            'NODE_ENV': '"production"'
          }
        })
    ]
};