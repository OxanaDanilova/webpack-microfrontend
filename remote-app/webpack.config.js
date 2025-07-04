const HtmlWebpackPlugin = require('html-webpack-plugin');
const ModuleFederationPlugin = require('webpack/lib/container/ModuleFederationPlugin');
const path = require('path');

module.exports = ()=> {
   return {
    mode: 'development',
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
      port: 5000,
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
        name: "remote",
        filename: "remoteEntry.js",
        exposes: {
          "./RemoteApp": "./src/App.tsx",
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
      }),
    ],
    resolve: {
      extensions: ['.tsx', '.ts', '.js'],
    },
  }
}
