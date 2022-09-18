import styled from '@emotion/styled';
import { device } from '@/utils/responsive';
import Avatar from 'react-avatar';

export const CustomAvatar = styled(Avatar)``;

export const Nav = styled.nav`
	background-color: white;
	grid-column: side-end / full-end;
	height: 10vh;
	grid-row-start: 1;
	grid-row-end: 2;
	display: flex;
	padding: 0 2rem;
	align-items: center;

	@media ${device.tabletPort} {
		justify-content: space-between;
	}

	.app-icon {
		display: flex;
		margin-right: 3rem;
		cursor: pointer;
		height: 100%;
		justify-content: center;
		align-items: center;
	}

	.chakra-input__group {
		@media ${device.tabletPort} {
			display: none;
		}
		flex: 40%;
		width: 40%;

		input {
			width: 50%;
		}
	}

	@media ${device.tabletPort} {
		grid-row-start: 1;
		grid-row-end: 2;
		grid-column: 1 / -1;
	}

	.user-nav {
		.search {
			display: none;
			@media ${device.tabletPort} {
				display: flex;
			}
		}
	}
`;
