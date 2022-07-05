const path = require("path");
const CopyPlugin = require("copy-webpack-plugin");
const WasmPackPlugin = require("@wasm-tool/wasm-pack-plugin");

const dist = path.resolve(__dirname, "dist");

module.exports = {
	mode: "production",
	entry: {
		index: "./src/index.tsx",
	},
	output: {
		path: dist,
		filename: "[name].js",
		chunkFilename: "[name].chunk.js",
	},
	devServer: {
		contentBase: dist,
	},
	resolve: {
		extensions: [".ts", ".tsx", ".js"],
		alias: {
			"@app": path.resolve(__dirname, 'src/'),
			"@components": path.resolve(__dirname, 'src/components/'),
			"@pages": path.resolve(__dirname, 'src/pages/'),
			"@pkg": path.resolve(__dirname, 'src/pkg/'),
		},
	},
	
	module: {
		rules: [
			{ test: /\.tsx?$/, loader: "ts-loader" },
		],
	},
	plugins: [
		new CopyPlugin([path.resolve(__dirname, "public")]),
		new WasmPackPlugin({
			crateDirectory: path.resolve(__dirname, "pkg/fractal/"),
			forceMode: "production",
			outDir: path.resolve(__dirname, "src/pkg/fractal")
		}),
	],
};
