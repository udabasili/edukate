import React from 'react';
import { Heading, Text } from '@chakra-ui/react';
import Image from 'next/image';
import { Features, Feature, HowItWorksContainer } from './index.styled';
import { SectionHeader } from '@/components/SectionHeader';

const options = [
	{
		name: 'Affordable Prices',
	},
	{
		name: 'Quality Classes',
	},
	{
		name: 'Flexible Learning',
	},
];

export const HowItWorks = () => {
	return (
		<HowItWorksContainer>
			<SectionHeader title="What we offer" />
			<Features>
				{options.map((option, index) => (
					<Feature key={index}>
						<Image
							src="/25-layers.png"
							alt="me"
							width="200"
							height="200"
							className="feature-image"
							objectFit="none"
							objectPosition="center"
						/>
						<Heading as="h3" size="lg" className="feature-heading" mb={2}>
							{option.name}
						</Heading>
						<Text className="feature-text" fontSize=".95rem">
							Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut
							labore et dolore magna aliqua.
						</Text>
					</Feature>
				))}
			</Features>
		</HowItWorksContainer>
	);
};
