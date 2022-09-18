import colors from '@/constant/colors';
import { Center, Heading } from '@chakra-ui/react';
import React from 'react';
type SectionHeaderProps = {
	title: string;
};

export const SectionHeader = ({ title }: SectionHeaderProps) => {
	return (
		<Center>
			<Heading as="h2" size="3xl" color="primaryDark" mb="4rem">
				{title}
			</Heading>
		</Center>
	);
};
