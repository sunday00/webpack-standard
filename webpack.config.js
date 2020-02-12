let webpack = require('webpack');
let path = require('path');
const glob = require('glob');

const TerserJSPlugin = require('terser-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const PurgecssPlugin = require('purgecss-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

const promisePipe = require('promisepipe');

const BuildHashedMenifestPlugin = require('./build/plugin/BuildHashedMenifestPlugin');

process.traceDeprecation = true;

module.exports = {
    entry : {
        main: [
            './src/main.js',
            './src/main.scss',
        ],
        vendor: ['lodash']
    },
    output:{
        path : path.resolve(__dirname, './dist'),
        filename: '[name].[chunkhash].js'
    },
    optimization: {
        minimizer: [new TerserJSPlugin({}), new OptimizeCSSAssetsPlugin({})],
    },
    plugins: [
        new MiniCssExtractPlugin({
            filename: '[name].[chunkhash].css',
        }),
        new PurgecssPlugin({
            paths: glob.sync(path.join(__dirname, 'index.php'), { nodir: true }),
        }),
        new CleanWebpackPlugin(),

        new BuildHashedMenifestPlugin({}),
        // actually, this is just for education.
        // real projects should use webpack-menifest-plugin

        // function(){
        //     this.plugin('done', stats => {
        //         require('fs').writeFileSync(
        //             path.join(__dirname, "dist/manifest.json"),
        //             JSON.stringify(stats.toJson().assetsByChunkName)
        //         );
        //     });
        // }
    ],
    module: {
        rules: [
            {
                test: /\.s[ac]ss$/,
                use: [
                    {
                        loader: MiniCssExtractPlugin.loader,
                        options:{
                            publicPath: '/dist/',
                        },
                    },
                    {
                        loader: 'css-loader',
                        // options: {
                        //     url: false,
                        // },
                    },
                    'sass-loader'
                ]
            },
            {
                test: /\.(png|jpe?g|gif)$/i,
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                            outputPath: 'images',
                        },
                    },
                    {
                        loader: 'img-loader',
                        options: {
                            plugins: [
                                // require('imagemin-gifsicle')({
                                //     // interlaced: false
                                // }),
                                require('imagemin-mozjpeg')({
                                    progressive: true,
                                    arithmetic: false
                                }),
                                // require('imagemin-optipng')({
                                //     // floyd: 0.5,
                                //     // speed: 2
                                // }),
                            ]
                        }
                    }
                ],
            },
            {
                test: /\.css$/,
                use: ['style-loader','css-loader']
            },
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: "babel-loader"
            }
        ]
    }
}