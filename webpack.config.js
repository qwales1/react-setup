var webpack = require('webpack');
var path = require('path');

module.exports = {
  entry: {
    'public' : './src/javascripts/index.js',
  },
  output: {
    path: path.join(__dirname, 'build','javascripts'),
    filename: '[name].js'
  },
  target: 'web',
  module : {
    loaders : [
        {test:/\.json$/, exclude: /node_modules/, loaders: 'json'},
        {test: /\.js$/,loaders: ['babel']}

    ]
  },
  plugins: [
    new webpack.IgnorePlugin(/\.(css|less|scss)$/)
  ]
}
