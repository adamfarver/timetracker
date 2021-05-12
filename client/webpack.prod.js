const path = require('path')
const common = require('./webpack.common')
const { merge } = require('webpack-merge')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin')
const TerserPlugin = require('terser-webpack-plugin')
var HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = merge(common, {
	mode: 'production',
	output: {
		filename: '[name].bundle.js',
		path: path.resolve(__dirname, 'dist'),
	},
	optimization: {
		minimizer: [
			new TerserPlugin(),
			new OptimizeCssAssetsPlugin(),
			new HtmlWebpackPlugin({
				template: './src/index.html',
				minify: {
					removeAttributeQuotes: true,
					collapseWhitespace: true,
					removeComments: true,
				},
			}),
		],
	},
	plugins: [
		new MiniCssExtractPlugin({ filename: '[name].[contentHash].css' }),
		new CleanWebpackPlugin(),
	],
	module: {
		rules: [
			{
				test: /\.jsx?$/,
				use: {
					loader: 'babel-loader',
					options: {
						plugins: ['@babel/plugin-transform-runtime'],
					},
				},
			},
			{
				test: /\.scss$/,
				use: [
					MiniCssExtractPlugin.loader, //3. Extract css into files
					'css-loader', //2. Turns css into commonjs
					'sass-loader', //1. Turns sass into css
				],
			},
		],
	},
	resolve: {
		extensions: ['.js', '.jsx'],
		alias: {
			'@': path.resolve(__dirname, 'src/'),
		},
	},
	externals: {
		// global app config object
		config: JSON.stringify({
			apiUrl: 'https://adamfarver-timetracker.herokuapp.com/api',
		}),
	},
})
