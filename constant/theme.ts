import { extendTheme, type ThemeConfig } from '@chakra-ui/react';
import colors from './colors';

const config: ThemeConfig = {
	initialColorMode: 'light',
	useSystemColorMode: false,
};
const theme = extendTheme({
	config,
	semanticTokens: {
		colors: {
			error: 'red.500',
			success: 'green.500',
			primary: {
				default: colors.primaryColor,
				_dark: 'red.400',
			},
			primaryDark: {
				default: colors.primaryColorDark,
				_dark: 'red.400',
			},
			primaryLight: {
				default: colors.primaryColorLight,
				_dark: 'red.400',
			},
			secondary: {
				default: colors.secondaryColor,
				_dark: 'red.700',
			},
		},
	},
	fonts: {
		heading: `'Montserrat', sans-serif`,
		body: `'Work Sans', sans-serif`,
	},
});

export default theme;
