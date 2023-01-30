import colors from '@/constant/colors';
import { device } from '@/utils/responsive';
import styled from '@emotion/styled';
import { Button } from '@chakra-ui/react';

export const FilterContainer = styled.div`
	display: flex;
	background-color: white;
	flex-direction: column;
	grid-column: full-start / col-end 2;
	height: 100vh;
	margin: 1rem;
	padding: 2rem 3rem;

	box-shadow: 0px 10px 5px 0px rgba(0, 0, 0, 0.28);

	@media ${device.tabletPort} {
		display: none;
		padding: 0;
		box-shadow: none;
	}

	&.mobile {
		display: flex;
	}
`;

export const FilterMobileButton = styled(Button)`
	display: none;
	grid-column: full-start / full-end;
	justify-self: flex-start;
	margin: 1rem;
	background-color: ${colors.primaryColorDark};

	@media ${device.tabletPort} {
		display: block;
	}
`;
export const CourseListContainer = styled.div`
	position: relative;
	overflow-y: auto;
	grid-column: full-start / full-end;
	display: grid;
	grid-template-columns: 1fr;
	column-gap: 1.5rem;
	row-gap: 2rem;
	min-height: 90vh;
	margin-top: 4rem;

	.spinner {
		position: absolute;
		left: 50%;
		transform: translateX('-50%');
		top: 30%;
	}

	@media ${device.tabletPort} {
		grid-column: full-start / full-end;
	}
`;

export const Course = styled.div`
	display: grid;
	grid-template-columns: max-content 1fr min-content;
	align-items: flex-start;
	cursor: pointer;
	column-gap: 1rem;

	&:hover {
		opacity: 0.7;
	}

	.image-container {
		display: grid;
		grid-column: 1 / 2;
		grid-row: 1 / -1;
		background-color: white;
		width: 100%;
		position: relative;
		box-shadow: 2px 10px 5px 0px rgba(0, 0, 0, 0.2);

		& > span {
			grid-column: 1 / -1;
		}
	}

	.details {
		grid-column: 2 / 3;
		display: flex;
		flex-direction: column;
	}

	.price {
		grid-column: 3 / 4;
	}
`;

export const SortContainer = styled.div`
	height: 10vh;
	background-color: white;
	box-shadow: 0px 10px 5px 0px rgba(0, 0, 0, 0.28);
	margin: 1rem 1rem;
	display: flex;
	grid-column: full-start / full-end;
`;
