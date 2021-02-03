var HtmlWebpackPlugin = require('html-webpack-plugin')
const path = require('path')
const webpack = require('webpack')
module.exports = {
	mode: 'development',
	module: {
		rules: [
			{
				test: /\.jsx?$/,
				loader: 'babel-loader',
			},
			{
				test: /\.scss$/,
				use: [
					{ loader: 'style-loader' },
					{ loader: 'css-loader' },
					{ loader: 'sass-loader' },
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
	plugins: [
		new HtmlWebpackPlugin({
			template: './src/index.html',
		}),
		new webpack.SourceMapDevToolPlugin({
			filename: 'sourcemaps/[file].map',
			publicPath: 'http://localhost:8080/',
			fileContext: 'public',
		}),
	],
	devServer: {
		historyApiFallback: true,
	},
	devtool: 'source-map',
	output: {
		path: path.join(__dirname, 'dist'),
		filename: `./[name].js`,
	},
	externals: {
		// global app config object
		config: JSON.stringify({
			apiUrl: 'http://localhost:5000/api',
		}),
	},
}
