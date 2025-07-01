const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');
const { ModuleFederationPlugin } = require('webpack').container;
const deps = require('./package.json').dependencies;

module.exports = (env, argv)=> {
  const istProductionMode = argv.mode === 'production';
  return {
    mode: istProductionMode ? 'production' : 'development',
    entry: {
      main: './src/main.tsx',
    },
    output: {
      path: path.resolve(__dirname, 'build'),
      filename: "[name][contenthash].js",
      clean: true,
      assetModuleFilename: "[name][ext]",
    },
    devServer: {
      static: {
        directory: path.resolve(__dirname, 'build'),
      },
      port: 3000,
      open: true,
      hot: true,
      historyApiFallback: true,
    },
    module: {
      rules: [
        {
          test:  /\.(js|ts|tsx)$/,
          exclude:/node_modules/,
          use: {
            loader: "babel-loader",
          }
        },
        {
          test:  /\.(ts|tsx)$/,
          exclude:/node_modules/,
          use: {
            loader: "ts-loader",
            options: {transpileOnly: true}
          }
        },
        {
          test:  /\.css$/,
          use: ['style-loader', 'css-loader']
        },
        {
          test:  /\.(png|svg|jpg|jpeg|gif)$/i,
          type: 'asset/resource'
        }
      ]
    },
    plugins: [
      new HtmlWebpackPlugin({
        template: './index.html'
      }),
      new ModuleFederationPlugin({
        name: 'host',
        remotes: {
          remote: "remote@http://localhost:5000/remoteEntry.js",
        },
        shared: {
          react: { singleton: true },
          'react-router-dom': {
            singleton: true,
          },
          'react-dom': {
            singleton: true,
          },
        },
      })
    ],
    resolve: {
      extensions: ['.tsx', '.ts', '.js'],
    },
  }
}
