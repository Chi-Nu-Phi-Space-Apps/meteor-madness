const path = require('path');

module.exports = {
  entry: './src/index.tsx',
  output: {
    path: path.resolve(__dirname, 'public'),
    filename: 'index.js',
  },
  module: {
    rules: [
      {
        test: /\.(png|jpe?g|gif|svg|webp)$/i,
        use: {
          loader: 'file-loader', // Or 'url-loader' for inlining small images
          options: {
            name: '[name].[hash].[ext]',
            outputPath: 'images/', // Output directory for images
          }
        }
      },
      {
        test: /\.tsx?$/,
        exclude: /node_modules/,
        use: 'ts-loader'
      },
    ],
  },
  resolve: {
    extensions: ['.js', '.ts', '.tsx'],
  },
  // TODO
  mode: 'development',
};
