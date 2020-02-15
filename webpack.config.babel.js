import { name, version, license } from "./package.json";
import { BannerPlugin } from "webpack";
import TerserPlugin from "terser-webpack-plugin";
import OptimizeCSSAssetsPlugin from "optimize-css-assets-webpack-plugin";
import MiniCssExtractPlugin from "mini-css-extract-plugin";
import nib from "nib";
import path from "path";

export default {
	// Entry
	entry: path.join(__dirname, "src/index.ts"),

	// Output
	output: {
		path: path.join(__dirname, "dist"),
		filename: "bundle.js"
	},

	module: {
		rules: [
			// TypeScript/JavaScript files
			{
				test: /\.tsx?$/,
				exclude: /node_modules/,
				loader: "babel-loader",
				resolve: {
					extensions: [".tsx", ".ts", ".js", ".jsx"]
				}
			},

			// Stylus/CSS files
			{
				test: /\.(css|styl)$/,
				use: [
					MiniCssExtractPlugin.loader,
					"css-loader",
					{
						loader: "stylus-loader",
						options: {
							use: nib(),
							import: "~nib/index.styl"
						}
					}
				]
			}
		]
	},

	plugins: [
		// Extract CSS into its own file
		new MiniCssExtractPlugin({
			filename: "bundle.css"
		}),

		// Add a banner with the project name and version
		new BannerPlugin({
			banner: `${name} | ${version} | ${license}`,
			include: ["bundle.js", "bundle.css"]
		})
	],

	optimization: {
		minimizer: [new TerserPlugin(), new OptimizeCSSAssetsPlugin()]
	}
};
