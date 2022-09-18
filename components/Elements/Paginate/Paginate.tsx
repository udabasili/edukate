import { AiFillCaretRight, AiFillCaretLeft } from 'react-icons/ai';
import { MyPaginate } from './index.styled';

type PaginationProps = {
	pageCount: number;
	handlePageClick: (e: { selected: number }) => void;
};

function Pagination(props: PaginationProps) {
	const { pageCount, handlePageClick } = props;

	return (
		<MyPaginate
			breakLabel="..."
			nextLabel={<AiFillCaretRight size={'2rem'} />}
			onPageChange={handlePageClick}
			pageRangeDisplayed={undefined}
			pageCount={pageCount}
			previousLabel={<AiFillCaretLeft size={'2rem'} />}
		/>
	);
}

export default Pagination;
