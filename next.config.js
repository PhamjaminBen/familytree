/** @type {import('next').NextConfig} */
module.exports = {
	reactStrictMode: true,
	images: {
		domains: ["res.cloudinary.com"],
	},
	future: {
		// by default, if you customize webpack config, they switch back to version 4.
		// Looks like backward compatibility approach.
		webpack5: true,
	},

	webpack(config) {
		config.resolve.fallback = {
			// if you miss it, all the other options in fallback, specified
			// by next.js will be dropped.
			...config.resolve.fallback,

			fs: false, // the solution
		};

		return config;
	},
	nextConfig: {},
	withTM: require("next-transpile-modules")(["@balkangraph/familytree.js"]), // pass the modules you would like to see transpiled
};
