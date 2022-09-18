import colors from '@/constant/colors';
import styled from '@emotion/styled';

export const SpinnerContainer = styled.div`
	border-style: solid;
	border-top: 16px solid black;
	border-radius: 50%;
	position: absolute;
	width: 120px;
	height: 120px;
	animation: spin 2s linear infinite;
	align-self: center;

	&.sm {
		width: 1.6rem;
		height: 1.6rem;
		border-width: 8px;
	}

	&.md {
		width: 3.2rem;
		height: 3.2rem;
	}

	&.lg {
		width: 4.8rem;
		height: 4.8rem;
	}

	&.xl {
		width: 6.4rem;
		height: 6.4rem;
	}

	&.dark {
		border: 16px solid black;
		border-top: 16px solid white;
	}

	&.light {
		border: 16px solid #f3f3f3;
		border-top: 16px solid ${colors.primaryColorLight};
	}

	&.primary {
		border: 16px solid ${colors.primaryColor};
		border-top: 16px solid ${colors.primaryColorDark};
	}

	@keyframes spin {
		0% {
			transform: rotate(0deg);
		}
		100% {
			transform: rotate(360deg);
		}
	}
`;
