/** @type {import('next').NextConfig} */
const nextConfig = {
	reactStrictMode: true,
	swcMinify: true,
};

module.exports = {
	...nextConfig,
	images: {
		domains: [
			'udemy-images.udemy.com',
			'source.unsplash.com',
			'user-images.githubusercontent.com',
			'cdn.pixabay.com',
		],
	},
};
