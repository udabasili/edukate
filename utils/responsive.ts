export const size = {
	mobile: '600px',
	tabletPort: '900px',
	tabletLand: '1200px',
	bigDesktop: '1800px',
};

export const device = {
	mobile: `screen and (max-width: ${size.mobile})`,
	tabletPort: `screen and (max-width: ${size.tabletPort})`,
	tabletLand: `screen and (max-width: ${size.tabletLand})`,
	bigDesktop: `screen and (min-width: ${size.bigDesktop})`,
};
