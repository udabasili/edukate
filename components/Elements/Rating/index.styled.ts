import styled from '@emotion/styled';
import colors from '@/constant/colors';

export const RatingContainer = styled.div`
	display: flex;
	.star {
		fill: #fefaf5;
		stroke: #e5991a;
		stroke-width: 1rem;
		font-size: 1.3rem;
		&.selected {
			fill: #e5991a;
		}
	}
`;
