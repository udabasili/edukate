import { AsideContainer } from '@/features/course';
import { device } from '@/utils/responsive';
import styled from '@emotion/styled';
import { Flex } from '@chakra-ui/react';

export const ShoppingCartSummaryContainer = styled(AsideContainer)`
	padding: 3rem;
	display: flex;
	flex-direction: column;

	@media ${device.tabletPort} {
		grid-column: full-start / full-end;
		min-height: 40vh;
		box-shadow: none;
		padding: 1.6rem;
		margin: 1rem;
		width: auto;
	}
`;

export const ShoppingCartListContainer = styled(Flex)`
	grid-column: full-start / col-start 6;
	margin: 2rem;
	padding: 1.6rem;
	background-color: white;

	@media ${device.tabletPort} {
		grid-column: full-start / full-end;
		margin: 1rem;
	}
`;
