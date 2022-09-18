import ReactPaginate from 'react-paginate';
import styled from '@emotion/styled';
import colors from '@/constant/colors';

const MyPaginate = styled(ReactPaginate)`
	margin-bottom: 2rem;
	grid-column: 1 / -1;
	height: 7vh;
	display: flex;
	background-color: ${colors.primaryColor};
	flex-direction: row;
	width: 80%;
	justify-self: center;
	justify-content: space-between;
	align-items: center;
	list-style-type: none;

	li a {
		cursor: pointer;
		font-size: 1.2rem;
		font-weight: bold;
		color: white;
		width: 25px;
		height: 25px;
		border-radius: 50%;
		display: flex;
		justify-content: center;
		align-items: center;
		border-width: 1px;
		border-style: solid;
		border-color: transparent;
	}
	li.previous,
	li.next {
		flex-basis: 30%;
		display: flex;
		justify-content: center;
		align-self: stretch;
		color: white;
		align-items: center;
		background-color: ${colors.primaryColor};
	}
	li.next a,
	li.break a {
		border-color: transparent;
	}
	li.selected,
	li.active a {
		border-color: ${colors.primaryColorDark};
		color: ${colors.primaryColorDark};
	}
	li.disabled a {
		color: grey;
	}
	li.disable,
	li.disabled a {
		cursor: default;
	}
`;

MyPaginate.defaultProps = { activeClassName: 'active' };
export { MyPaginate };
