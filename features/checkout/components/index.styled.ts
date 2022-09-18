import styled from '@emotion/styled';
import { device } from '@/utils/responsive';

export const CheckoutFormContainer = styled.form`
	grid-column: full-start / col-start 6;
	margin: 2rem;
	padding: 1.6rem;
	background-color: white;

	@media ${device.tabletPort} {
		grid-column: full-start / full-end;
		min-height: 40vh;
		box-shadow: none;
		padding: 1.6rem;
		margin: 1rem;
		width: auto;
	}
`;
