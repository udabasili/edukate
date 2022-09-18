import { device } from '@/utils/responsive';
import styled from '@emotion/styled';
import colors from '@/constant/colors';

export const SideNav = styled.nav`
	background-color: ${colors.primaryColor};
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: space-between;
	position: fixed;
	z-index: 10;
	top: 0;
	left: 0;
	width: 6rem;
	grid-column: side-start / side-end;
	grid-row: 1 / 3;
	padding: 1rem 0;
	height: 100vh;

	@media ${device.tabletPort} {
		justify-content: space-between;
		box-shadow: 0px 10px 5px 0px rgba(0, 0, 0, 0.28);
		flex-direction: row;
		padding: 0 3rem;
		position: fixed;
		top: unset;
		width: 100vw;
		bottom: 0;
		left: 0;
		height: 10vh;
	}
`;
