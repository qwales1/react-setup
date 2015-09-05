var webpack = require('webpack');
var path = require('path');

module.exports = {
  entry: {
    'main' : './src/javascripts/app.js',
  },
  output: {
    path: path.join(__dirname, 'dist','javascripts'),
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
