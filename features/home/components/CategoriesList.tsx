import { Box, Center, Heading } from '@chakra-ui/react';
import { CATEGORIES } from '@/data/categories';
import React from 'react';
import { Categories, CategoriesListContainer, Category } from './index.styled';
import Image from 'next/image';
import { SectionHeader } from '@/components/SectionHeader';
import NextLink from 'next/link';

export const CategoriesList = () => {
	return (
		<CategoriesListContainer>
			<SectionHeader title="Categories" />
			<Categories>
				{CATEGORIES.map((category) => (
					<NextLink href={`/categories/${category.name.toLowerCase()}`} key={category.id} passHref>
						<Category>
							<Box className="image-container" bg="primaryLight">
								<Image
									src={category.imagePath}
									alt={category.name}
									width="150"
									height="150"
									objectFit="contain"
								/>
							</Box>
							<Heading as="h5" size="sm">
								{category.name}
							</Heading>
						</Category>
					</NextLink>
				))}
			</Categories>
		</CategoriesListContainer>
	);
};
