import NextLink from 'next/link';
import { Center, Heading, Input, InputGroup, Button, InputRightElement } from '@chakra-ui/react';
import React from 'react';
import { HeaderContainer } from './index.styled';

export const Header = () => {
	return (
		<HeaderContainer>
			<Center maxW="32rem" className="text-box">
				<Heading as="h1" size="4xl" color="white">
					Learn A Lot
				</Heading>
				<Heading as="h1" size="4xl" color="white" mb={3}>
					Save Big
				</Heading>
				<Heading as="h4" size="md" mb={10}>
					A broad selection of courses
				</Heading>
				<NextLink href="/courses" passHref>
					<Button bg="black" display="block" color="white">
						Start Learning
					</Button>
				</NextLink>
			</Center>
		</HeaderContainer>
	);
};
