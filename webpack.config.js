const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CopyPlugin = require('copy-webpack-plugin');
const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin');

module.exports = (env, argv) => {
  const isDev = argv.mode !== 'production';
  const appPath = path.resolve(__dirname, 'app/');
  const distPath = path.resolve(__dirname, 'dist/');

  return {
    entry: path.join(appPath, 'src/index.tsx'),
    devtool: 'inline-source-map',
    devServer: {
      historyApiFallback: {
        index: '/',
      },
      https: true,
      server: 'https',
      static: {
        directory: distPath
      },
      devMiddleware: {
        writeToDisk: true,
      },
      liveReload: true,
      open: true,
    },
    module: {
      rules: [
        {
          test: /\.tsx?$/,
          exclude: /node_modules/,
          use: [
            {
              loader: 'ts-loader',
              options: {
                configFile: path.resolve(__dirname, 'tsconfig.webpack.json'),
              },
            },
          ],
        },
        {
          test: /\.(js|jsx)$/,
          exclude: /node_modules/,
          use: {
            loader: 'babel-loader'
          }
        },
        {
          test: /\.s[ac]ss$/i,
          use: [
            // Creates `style` nodes from JS strings
            isDev ? 'style-loader' : MiniCssExtractPlugin.loader,
            // Translates CSS into CommonJS
            'css-loader',
            // Compiles Sass to CSS
            'sass-loader',
          ],
        },
      ],
    },
    resolve: {
      plugins: [ new TsconfigPathsPlugin() ],
      extensions: [ '.tsx', '.ts', '.js' ],
    },
    output: {
      filename: 'lifelog.js',
      path: path.join(distPath, 'static/js'),
    },
    plugins: [
      new MiniCssExtractPlugin({
        filename: '../styles/index.css',
      }),
      new CopyPlugin({
        patterns: [
          { from: `${appPath}/static`, to: distPath },
        ],
      }),
    ],
  };
}
