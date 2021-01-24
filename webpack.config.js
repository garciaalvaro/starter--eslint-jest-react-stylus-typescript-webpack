const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const TerserPlugin = require("terser-webpack-plugin");
const path = require("path");
const name = "bundle";

module.exports = (env, { mode }) => {
	const is_production = mode === "production";
	const is_development = !is_production;

	const config = {
		watch: is_development,

		entry: path.resolve(__dirname, "src/entry.ts"),

		output: {
			path: path.resolve(__dirname, "dist"),
			filename: `${name}.js`,
		},

		resolve: {
			alias: {
				"@": path.resolve(__dirname, "src"),
			},
		},

		module: { rules: [] },

		plugins: [],
	};

	config.module.rules.push({
		test: /\.tsx?$/,
		exclude: /node_modules/,
		loader: "babel-loader",
		resolve: {
			extensions: [".ts", ".tsx", ".js", ".jsx"],
		},
	});

	config.module.rules.push({
		test: /\.(css|styl)$/,
		use: [
			MiniCssExtractPlugin.loader,

			{
				loader: "css-loader",
				options: {
					modules: {
						localIdentName: is_production
							? "[hash:base64:5]"
							: "[name]-[local]-[hash:base64:2]",
					},
				},
			},

			{
				loader: "stylus-loader",
				options: {
					stylusOptions: {
						use: "nib",
					},
				},
			},
		],
	});

	config.plugins.push(
		new MiniCssExtractPlugin({
			filename: `${name}.css`,
		})
	);

	if (is_production) {
		config.optimization = {
			minimize: true,
			minimizer: [
				new CssMinimizerPlugin(),

				// As we are using a custom optimization, making use of
				// CssMinimizerPlugin, we also need to specify TerserPlugin
				new TerserPlugin({ extractComments: false }),
			],
		};
	}

	return config;
};
