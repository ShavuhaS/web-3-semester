const path =  require('path');
const Dotenv = require('dotenv-webpack');

const ENV_PATH = (process.env.NODE_ENV === 'production')
  ? '.env.production'
  : '.env.development';

module.exports = {
  entry: {
    page1: './client/src/page1.js',
    page2: './client/src/page2.js',
  },
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, './public/js'),
    clean: true,
  },
  plugins: [
    new Dotenv({
      path: ENV_PATH,
    }),
  ],
};