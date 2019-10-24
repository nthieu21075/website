const webpack = require('webpack')
const HtmlWebPackPlugin = require("html-webpack-plugin")
const path = require('path')
const nodeModulesDir = path.join(__dirname, 'node_modules')
const dotenv = require('dotenv')
const env = dotenv.config().parsed
const envKeys = Object.keys(env).reduce((prev, next) => {
        prev[`process.env.${next}`] = JSON.stringify(env[next])
        return prev
    }, { '__DEV__': true })

module.exports = {
    context: path.join(__dirname, '/src'),
    entry: {
        main: [
            '@babel/polyfill',
            './index.js',
        ]
    },
    mode: 'development',
    devServer: {
        historyApiFallback: true,
        contentBase: './public',
        port: 3000
    },
    resolve: {
        alias: {
          components: path.resolve(__dirname, 'src/components/'),
          containers: path.resolve(__dirname, 'src/containers/'),
          public: path.resolve(__dirname, 'public/'),
          global: path.resolve(__dirname, 'src/global/'),
          helpers: path.resolve(__dirname, 'src/helpers/'),
          pages: path.resolve(__dirname, 'src/pages/'),
          services: path.resolve(__dirname, 'src/services/'),
          stores: path.resolve(__dirname, 'src/stores/')
        },
        modules: ['src/front', 'node_modules'],
        extensions: ['.js', 'jsx']
    },
    output: {
        filename: 'bundle.js',
        path: path.join(__dirname, '/public')
    },
    module: {
        rules: [{
                test: /\.jsx?$/,
                exclude: [nodeModulesDir],
                loader: 'babel-loader'
            },
            {
                test: /\.css$/,
                use: [
                    'style-loader',
                    'css-loader'
                    , 'sass-loader'
                ]
            },
            {
                test: /\.s[ac]ss$/,
                use: [
                    'style-loader', 'css-loader', 'sass-loader'
                ]
            },
            {
                test: /\.(eot|woff|woff2|ttf|svg|png|jpe?g|gif)(\?\S*)?$/,
                use: [{
                    loader: 'url-loader',
                    options: {
                        limit: 100000,
                        name: '[name].[ext]',
                    },
                }, ],
            }
        ],
    },
    plugins: [
        new HtmlWebPackPlugin({
            template: "./index.html",
            filename: "index.html"
        }),
        new webpack.DefinePlugin(envKeys)
    ]
}