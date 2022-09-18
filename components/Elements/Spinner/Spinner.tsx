import { SpinnerProps } from '@chakra-ui/react';
import React from 'react';
import { SpinnerContainer } from './spinner.style';

const sizes = {
	sm: 'sm',
	md: 'md',
	lg: 'lg',
	xl: 'h-24 w-24',
};

const variants = {
	light: 'light',
	primary: 'primary',
	dark: 'dark',
};

type Props = {
	size: keyof typeof sizes;
	variant: keyof typeof variants;
	className?: any;
} & SpinnerProps;

export const Spinner = ({ size = 'md', variant = 'primary', className }: Props) => {
	return <SpinnerContainer className={`${size} ${variant} ${className}`} />;
};
