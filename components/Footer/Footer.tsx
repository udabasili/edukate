import React from 'react';
import { BsFillArrowRightSquareFill } from 'react-icons/bs';
import { FooterContainer } from './footer.styled';
import { Heading, List, ListIcon, ListItem, Text } from '@chakra-ui/react';

export const Footer = () => {
	return (
		<FooterContainer>
			<div className="col-1-of-3">
				<Heading as="h3" size="lg" className="feature-heading" mb={2}>
					About
				</Heading>
				<Text fontSize="1rem">
					Masterstudy is Education WordPress theme featured by Learning Management System (LMS) for online
					education. Developed by StylemixThemes.
				</Text>
			</div>
			<div className="col-1-of-3">
				<Heading as="h3" size="lg" className="feature-heading" mb={2}>
					Pages
				</Heading>
				<List spacing={3} fontSize="1rem">
					<ListItem>
						<ListIcon as={BsFillArrowRightSquareFill} color="primaryDark" />
						Courses
					</ListItem>
					<ListItem>
						<ListIcon as={BsFillArrowRightSquareFill} color="primaryDark" />
						Profile
					</ListItem>
					<ListItem>
						<ListIcon as={BsFillArrowRightSquareFill} color="primaryDark" />
						About
					</ListItem>
					<ListItem>
						<ListIcon as={BsFillArrowRightSquareFill} color="primaryDark" />
						Contact
					</ListItem>
				</List>
			</div>
			<div className="col-1-of-3">
				<Heading as="h3" size="lg" className="feature-heading" mb={2}>
					Contact
				</Heading>
				<List spacing={3} fontSize="1rem">
					<ListItem>USA, Callifornia 20, First Avenue, Callifornia</ListItem>
					<ListItem>+1 212 458 300 32</ListItem>
					<ListItem>+1 212 458 300 32</ListItem>
				</List>
			</div>
		</FooterContainer>
	);
};
