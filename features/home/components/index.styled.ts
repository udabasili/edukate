import colors from '@/constant/colors';
import styled from '@emotion/styled';

const Section = styled.section`
	background-color: ${colors.backgroundColor};
	margin: 6rem;
	padding: 2rem 0;
	display: grid;
	grid-column: full-start / full-end;
`;

/** HEADER */
export const HeaderContainer = styled.header`
	grid-column: full-start / full-end;
	height: 100vh;
	background-size: cover;
	background-blend-mode: multiply;
	background-repeat: no-repeat;
	background-image: linear-gradient(to right, ${colors.primaryColor} 40%, ${colors.primaryColorLight} 90%),
		url('/images/header.jpg');
	display: flex;
	justify-content: center;
	align-items: center;

	.text-box {
		display: flex;
		flex-direction: column;
	}
`;

export const HowItWorksContainer = styled(Section)``;

export const Features = styled.div`
	display: grid;
	grid-template-columns: repeat(auto-fit, minmax(14rem, 1fr));
	grid-column: 2rem;
	column-gap: 3rem;
`;

export const Feature = styled.div`
	display: grid;
	grid-template-columns: repeat(2, 1fr);
	position: relative;
	text-align: center;

	& > span {
		grid-column: 1 / -1;
	}

	.feature-heading {
		grid-column: 1 / -1;
		text-align: center;
	}

	.feature-text {
		grid-column: 1 / -1;
	}
`;

export const CategoriesListContainer = styled(Section)``;

export const Categories = styled.div`
	display: grid;
	grid-template-columns: repeat(auto-fill, minmax(14rem, 1fr));
	gap: 1.5rem;
`;

export const Category = styled.div`
	display: grid;
	grid-template-columns: repeat(2, fr);
	row-gap: 1rem;

	.image-container {
		display: grid;
		grid-column: 1 / -1;
		padding: 1.3rem;
		width: 100%;
		position: relative;
		cursor: pointer;
		box-shadow: 2px 10px 5px 0px rgba(0, 0, 0, 0.2);

		&:hover {
			transform: scale(1.04);
			opacity: 0.7;
		}

		& > span {
			grid-column: 1 / -1;
		}
	}
`;

export const Courses = styled.div`
	display: grid;
	grid-template-columns: repeat(auto-fit, minmax(10rem, 1fr));
	column-gap: 1.5rem;
`;

export const Course = styled.div`
	display: grid;
	grid-template-columns: repeat(2, fr);

	.image-container {
		display: grid;
		grid-column: 1 / 2;
		grid-row: 1 / -1;
		background-color: white;
		width: 100%;
		cursor: pointer;
		position: relative;
		box-shadow: 2px 10px 5px 0px rgba(0, 0, 0, 0.2);

		&:hover {
			transform: scale(1.04);
			opacity: 0.7;
		}

		& > span {
			grid-column: 1 / -1;
		}
	}

	h5 {
		margin-top: 1rem;
	}
`;
