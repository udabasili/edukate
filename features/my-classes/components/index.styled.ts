import colors from '@/constant/colors';
import styled from '@emotion/styled';
import { Box, FormControl, Heading, Img, MenuButton, Progress, Text } from '@chakra-ui/react';

const Section = styled.section`
	background-color: ${colors.backgroundColor};
	margin: 6rem;
	padding: 2rem 0;
	display: grid;
	grid-column: full-start / full-end;
`;

export const ClassListContainer = styled(Section)`
	grid-template-columns: repeat(auto-fill, minmax(16rem, 1fr));
	gap: 1rem;
`;

export const ClassItemContainer = styled(Box)`
	display: grid;
	grid-template-columns: repeat(2, 1fr);
	background-color: white;
	cursor: pointer;

	&:hover {
		opacity: 0.6;
		scale: 1.02;
	}
`;

export const Image = styled(Img)`
	grid-column: 1 / -1;
	grid-row: 1/ 2;
	background-color: green;
	width: 100%;
`;

export const OptionMenu = styled(MenuButton)`
	grid-column: 2 / 3;
	grid-row: 1 / 2;
	background-color: white;
	align-self: flex-start;
	height: 2.5rem;
	width: 2.5rem;
	//this prevent like from pushing the elemnt in this area to a new row
	z-index: 2;
	//since justify-self is main axis , this is placed at the end on the horizontally
	justify-self: end;
	color: black;
	margin: 1rem;
`;

export const Name = styled(Heading)`
	grid-row: 2 / 3;
	grid-column: 1 / -1;
	justify-self: center;
	padding: 1rem;
`;

export const Tutor = styled(Text)`
	grid-column: 1 / -1;
	justify-self: flex-start;
	padding: 0.1rem 1rem;
`;

export const CourseProgress = styled(FormControl)`
	grid-column: 1 / -1;
	justify-self: flex-start;
	padding: 0.1rem 1rem;

	label {
		font-size: 0.7rem;
		font-weight: bold;
	}
`;
