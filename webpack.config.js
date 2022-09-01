const path = require('path');

module.exports = {
	mode: 'production',
	target: 'webworker',
	entry: './src/extension.ts',
	output: {
		filename: 'extension.js',
		path: path.join(__dirname, './out/web'),
		libraryTarget: 'commonjs',
	},
	module: {
		rules: [
			{
				test: /\.ts$/,
				exclude: /node_modules/,
				use: [
					{
						loader: 'ts-loader',
					},
				],
			},
		],
	},
	resolve: {
		mainFields: ['browser', 'module', 'main'],
		extensions: ['.ts', '.js'],
	},
	externals: {
		vscode: 'commonjs vscode',
	},
}
