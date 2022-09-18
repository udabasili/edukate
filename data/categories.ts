const basePath = '/images/categories';

export const CATEGORIES = [
	{
		id: 1,
		name: 'Development',
		imagePath: `${basePath}/coding.png`,
	},
	{
		id: 2,
		name: 'Design',
		imagePath: `${basePath}/web-design.png`,
	},
	{
		id: 3,
		name: 'Marketing',
		imagePath: `${basePath}/digital-marketing.png`,
	},
	{
		id: 4,
		name: 'Personal Development',
		imagePath: `${basePath}/personal-development.png`,
	},
	{
		id: 5,
		name: 'Business',
		imagePath: `${basePath}/stats.png`,
	},
	{
		id: 6,
		name: 'Photography',
		imagePath: `${basePath}/photography.png`,
	},
	{
		id: 7,
		name: 'Music',
		imagePath: `${basePath}/headphones.png`,
	},
];

const categoryName = CATEGORIES.map((category) => category.name);

// eslint-disable-next-line import/no-anonymous-default-export
export default {
	categoryName,
} as const;
