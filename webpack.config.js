const path = require('path');

module.exports = {
  entry: './public/src/index.js',
  output: {
    path: path.resolve(__dirname, '/public/dist'),
    filename: 'bundle.js' 
  },
  module: {
    rules: [
      {
        test: /.(js|jsx)$/,
        exclude: /node_modules/,
        use: ['babel-loader']
      }
    ]
  },
  devtool: 'inline-source-map',
  performance: { hints: false }
}
