import colors from '@/constant/colors';
import { device } from '@/utils/responsive';
import styled from '@emotion/styled';

const Section = styled.section`
	display: grid;
	grid-column: full-start / full-end;
	gap: 2rem;
	grid-template-columns: inherit;
	min-height: 100vh;
	padding: 2rem;
`;

export const CartContainer = styled(Section)``;
