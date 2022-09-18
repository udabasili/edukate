import { device } from '@/utils/responsive';
import styled from '@emotion/styled';
import colors from '@/constant/colors';

export const MainLayoutContainer = styled.div`
	display: grid;
	font-size: 62.5%;
	grid-template-columns:
		[side-start] 6rem [side-end full-start] minmax(6rem, 1fr) [center-start] repeat(
			8,
			[col-start] minmax(min-content, 14rem) [col-end]
		)
		[center-end] minmax(6rem, 1fr) [full-end];
	background-color: ${colors.backgroundColor};
`;

export const Main = styled.main`
	grid-column: full-start / full-end;
	grid-row-start: 2;
	display: grid;
	grid-template-columns:
		[full-start] minmax(6rem, 1fr) [center-start] repeat(8, [col-start] minmax(min-content, 14rem) [col-end])
		[center-end] minmax(6rem, 1fr) [full-end];

	@media ${device.tabletPort} {
		grid-column: 1 / -1;
	}
`;
