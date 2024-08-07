/** @type {import('next').NextConfig} */
const nextConfig = {
	images: {
		remotePatterns: [
			{
				protocol: "https",
				hostname: "v2.exercisedb.io",
				port: "",
				pathname: "/image/**",
			},
			{
				protocol: "https",
				hostname: "storage.googleapis.com",
				port: "",
			},
		],
	},
	reactStrictMode: false,
	webpack(config) {
		config.module.rules.push({
			test: /\.svg$/,
			use: [{ loader: "@svgr/webpack", options: { icon: true } }],
		});
		return config;
	},
};

module.exports = nextConfig;
