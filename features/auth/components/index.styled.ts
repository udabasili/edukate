import colors from '@/constant/colors';
import { device } from '@/utils/responsive';
import styled from '@emotion/styled';

const Section = styled.section``;

export const AuthContainer = styled.div`
	height: 100vh;
	width: 100%;
	grid-column: full-start / full-end;
	display: flex;
	justify-content: center;
	align-items: center;
	background-color: ${colors.backgroundColor};

	.side {
		height: 60%;
		width: 30%;
		@media ${device.tabletPort} {
			height: 40%;
			width: 50%;
		}
	}

	@media ${device.tabletPort} {
		flex-direction: column;
	}
`;

export const RegisterContainer = styled.div`
	height: 60%;
	width: 30%;
	background-color: white;
	overflow: auto;

	@media ${device.tabletPort} {
		height: 40%;
		width: 50%;
	}
`;
