const HtmlWebpackPlugin = require('html-webpack-plugin');
const ModuleFederationPlugin = require('webpack/lib/container/ModuleFederationPlugin');
const path = require('path');
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
        name: "remote", // it needs to be identical to the key value "[here]@xxxxx" in our Host config
        filename: "remoteEntry.js", // sets the name of the manifest file
        exposes: {
          "./RemoteApp": "./src/App.tsx",  // aliases files names
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
