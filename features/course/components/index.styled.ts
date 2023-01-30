import colors from '@/constant/colors';
import { Editable, Tabs, Text } from '@chakra-ui/react';
import styled from '@emotion/styled';
import { device } from '@/utils/responsive';

const Section = styled.section`
	display: grid;
	grid-column: full-start / full-end;
	gap: 2rem;
	grid-template-columns: inherit;
	min-height: 100vh;
	padding: 2rem;

	@media ${device.tabletPort} {
		gap: 0;
		padding: 0rem 0.5rem;
	}
`;

export const CourseHeaderContainer = styled.header`
	grid-column: full-start / full-end;
	background-color: ${colors.primaryColorLight};
	height: 50vh;
	display: flex;
	flex-direction: column;
	justify-content: center;
	padding-left: 3rem;

	@media ${device.tabletPort} {
		align-items: center;
		height: max-content;
		padding: 1rem 2rem;
	}
`;

export const CourseContainer = styled(Section)`
	position: relative;
	.spinner {
		position: absolute;
		left: 50%;
		top: 30%;
	}

	&.course {
		@media ${device.tabletPort} {
			grid-template-rows: min-content max-content;
		}
	}
`;

export const CourseBodyContainer = styled.div`
	grid-column: full-start / col-end 5;
	grid-row-start: 2;
	align-self: flex-start;
	display: flex;
	flex-direction: column;
	justify-content: center;
	padding: 4rem;

	@media ${device.tabletPort} {
		grid-column: full-start / full-end;
		grid-row: 3;
		padding: 0;
	}
`;

export const DescriptionContainer = styled.div`
	padding: 1.5rem;

	p {
		line-height: 1.2;
	}

	p {
		font-size: 0.9rem;
	}
`;

export const AsideContainer = styled.aside`
	grid-column: col-start 6 / full-end;
	background-color: white;
	width: 100%;
	position: relative;
	min-height: 60vh;
	box-shadow: 1rem 4rem 4rem rgba(0, 0, 0, 0.12);
	display: flex;
	flex-direction: column;

	&.course {
		grid-column: full-start / col-end 2;
		padding: 0.6rem 1.5rem;
		height: 90vh;
		overflow-y: auto;

		@media ${device.tabletPort} {
			display: none;
		}
	}

	@media ${device.tabletPort} {
		grid-column: full-start / full-end;
		grid-row: 2;
		padding-bottom: 3rem;
	}
`;

export const AsideMobile = styled.div`
	display: none;
	@media ${device.tabletPort} {
		grid-column: full-start / full-end;
		background-color: white;
		position: relative;
		height: 10vh;
		display: flex;
		justify-content: flex-start;
		align-items: center;
	}
`;
export const ImageContainer = styled.div`
	position: relative;
	width: 100%;
	height: 30vh;
	margin-bottom: 2rem;
`;

export const TabsCustom = styled(Tabs)`
	box-shadow: 1rem 4rem 4rem rgba(0, 0, 0, 0.12);
` as typeof Tabs;

export const AddCourseContainer = styled(Section)`
	.tabs {
		grid-column: full-start / col-end 7;
		background-color: white;
		overflow-y: auto;
		min-height: 70vh;

		@media ${device.tabletPort} {
			grid-column: full-start / full-end;
		}
	}

	.chakra-tabs__tab-panels {
		min-height: 40vh;
	}

	.others {
		grid-column: col-end 7 / full-end;
		background-color: white;

		@media ${device.tabletPort} {
			grid-column: full-start / full-end;
		}
	}
`;

export const Form = styled.form`
	margin: 2rem 0;
	background-color: ${colors.backgroundColor};
	padding: 2rem;
	display: flex;
	flex-direction: column;

	.trash {
		align-self: flex-end;
		color: red;
		cursor: pointer;

		&:hover {
			opacity: 0.5;
		}
	}
`;

export const MainContent = styled.div`
	background-color: white;
	display: flex;
	grid-column: col-end 2 / full-end;
	width: 100%;
	height: 100%;
	position: relative;

	@media ${device.tabletPort} {
		grid-column: full-start / full-end;
		height: 50vh;
	}

	.spinner {
		position: absolute;
		left: 50%;
		top: 50%;
	}

	.react-player {
		flex: 1;
	}
`;

export const BackButton = styled(Text)`
	display: flex;
	align-items: center;
	font-size: 1rem;
	font-weight: bolder;
	color: ${colors.primaryColorDark};
`;

export const EditableCustom = styled(Editable)`
	grid-column: full-start / col-end 7;

	@media ${device.tabletPort} {
		grid-column: full-start / full-end;
	}
`;
