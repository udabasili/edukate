import { SearchIcon } from '@chakra-ui/icons';
import { Box, Heading, IconButton } from '@chakra-ui/react';
import React from 'react';
import { AiFillCaretLeft, AiFillCaretRight } from 'react-icons/ai';

import { Pagination } from './index.styled';

type PaginationButtonProps = {
	hasNextPage: boolean;
	fetchNextPage: () => void;
	hasPreviousPage: boolean;
	fetchPreviousPage: () => void;
	setPage: React.Dispatch<React.SetStateAction<number>>;
	page: number;
};
export const PaginationButton = (props: PaginationButtonProps) => {
	const { fetchNextPage, hasPreviousPage, hasNextPage, setPage, fetchPreviousPage, page } = props;
	return (
		<Pagination>
			<IconButton
				colorScheme="blue"
				aria-label="Search database"
				icon={<AiFillCaretLeft />}
				onClick={() => {
					fetchPreviousPage();
					setPage((old) => Math.max(old - 1, 0));
				}}
				disabled={page === 1}
			/>
			<Heading as="h5" size="xs" mx={4}>
				Showing: <Box mr={5}> Page {page}</Box>
			</Heading>
			<IconButton
				colorScheme="blue"
				aria-label="Search database"
				icon={<AiFillCaretRight />}
				onClick={() => {
					fetchNextPage();
					setPage((old) => page + 1);
				}}
				disabled={!hasNextPage}
			/>
		</Pagination>
	);
};
