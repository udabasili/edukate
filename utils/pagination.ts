type Props = {
	totalItems: number;
	currentPage: number;
	pageSize?: number;
};
export function paginate(props: Props) {
	const { totalItems, pageSize = 10 } = props;
	let { currentPage = 1 } = props;

	const totalPages = Math.ceil(totalItems / pageSize);

	if (currentPage < 1) {
		currentPage = 1;
	} else if (currentPage > totalPages) {
		currentPage = totalPages;
	}

	let startPage = 0,
		endPage = 0;
	startPage = 1;
	endPage = totalPages;

	// calculate start and end item indexes
	const startIndex = (currentPage - 1) * pageSize;
	const endIndex = Math.min(startIndex + pageSize - 1, totalItems - 1);

	// create an array of pages to ng-repeat in the pager control
	const pages = Array.from(Array(endPage + 1 - startPage).keys()).map((i) => startPage + i);

	return {
		totalItems: totalItems,
		currentPage: currentPage,
		pageSize: pageSize,
		totalPages: totalPages,
		startPage: startPage,
		endPage: endPage,
		startIndex: startIndex,
		endIndex: endIndex,
		pages: pages,
	};
}
