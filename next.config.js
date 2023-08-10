/** @type {import('next').NextConfig} */
module.exports = {
	nextConfig: {},
	withTM: require("next-transpile-modules")(["@balkangraph/familytree.js"]), // pass the modules you would like to see transpiled
};
