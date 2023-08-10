module.exports = {
	debug: true,
	entry: ["./sdocs.js"],
	output: {
		filename: "./[name].bundle.js",
	},
	module: {
		loaders: [{ test: /\.css$/, loader: "style-loader!css-loader" }],
	},
};
