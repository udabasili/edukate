import styled from '@emotion/styled';
import { device } from '@/utils/responsive';
import colors from '@/constant/colors';

export const FooterContainer = styled.footer`
	display: grid;
	grid-column: full-start / full-end;
	grid-template-columns: repeat(3, 1fr);
	background-color: ${colors.primaryColorLight};
	padding: 1.5rem;

	.col-1-of-3 {
		display: flex;
		flex-direction: column;
		align-items: flex-start;
		margin: 1.5rem;
	}

	@media ${device.tabletPort} {
		margin-bottom: 10vh;
		grid-template-columns: 1fr;
	}
`;
