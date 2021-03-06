
const HtmlWebpackPlugin       = require('html-webpack-plugin');
const MiniCssExtractPlugin    = require('mini-css-extract-plugin');
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const CopyPlugin              = require('copy-webpack-plugin');

module.exports = {

    mode: 'development',

    optimization: {
        minimizer: [ new OptimizeCssAssetsPlugin() ]
    },

    module: {
        rules: [

            // HTML loader
            {
                test: /\.html$/i,
                loader: 'html-loader',
                options: {
                    sources: false,
                    minimize: false,
                }
            },

            // CSS loader (estilos dinamicos)
            {
                test: /\.css$/i,
                exclude: /styles\.css$/i,
                use: [
                    'style-loader',
                    'css-loader',
                ],
            },

            // CSS Minify (estilos globales)
            {
                test: /styles\.css$/i,
                use: [
                    MiniCssExtractPlugin.loader,
                    'css-loader'
                ],
            },

            // SASS loader
            {
                test: /styles\.s[ac]ss$/i,
                use: [
                    'style-loader',
                    'css-loader',
                    'sass-loader',
                ],
            },

            // File loader (imagenes e iconos)
            {
                test: /\.(png|jpe?g|gif)$/i,
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                            esModule: false,
                            name: 'assets/[name].[ext]'
                        },
                    },
                ],
            },


        ]
    },

    plugins: [
        new HtmlWebpackPlugin({
            template: './src/index.html',
            filename: './index.html',
        }),
        new MiniCssExtractPlugin({
            filename: '[name].css',
            ignoreOrder: false,
        }),
        new CopyPlugin({
            patterns: [
                { from: "src/assets", to: "assets/" },
            ]
        }),
    ]

}
