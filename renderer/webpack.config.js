module.exports = {
	context: __dirname + "./",
	module: {
		loaders: [
			{
				test: /\.css$/,
				use: ["style-loader", "css-loader"],
			},
		],
	},
};
