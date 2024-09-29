const webpack = require('webpack');

module.exports = {
  // ... other configurations ...
  resolve: {
    fallback: {
      fs: false,
      encoding: require.resolve('encoding'),
    },
  },
  plugins: [
    new webpack.ProvidePlugin({
      process: 'process/browser',
      Buffer: ['buffer', 'Buffer'],
    }),
  ],
};
