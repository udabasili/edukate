import React from 'react';
import { Course, CourseListContainer } from './index.styled';
import Image from 'next/image';
import { Flex, Heading, Text } from '@chakra-ui/react';
import { Rating } from '@/components/Elements/Rating';
import { CourseType } from '../types';
import { Spinner } from '@/components/Elements';
import NextLink from 'next/link';
import InfiniteScroll from 'react-infinite-scroll-component';
import DOMPurify from 'isomorphic-dompurify';
import { CourseItem } from './CourseItem';
import styles from './index.module.css';

type CourseListProps = {
	coursesList: Array<CourseType>;
	fetchMoreData: () => void;
	hasMore: boolean;
};

export const CourseList = (props: CourseListProps) => {
	const { coursesList, fetchMoreData, hasMore } = props;
	return (
		<CourseListContainer>
			<InfiniteScroll
				dataLength={coursesList.length}
				next={fetchMoreData}
				className={styles.courseListContainer}
				hasMore={hasMore}
				loader={
					<Flex
						w="100%"
						p={4}
						color="white"
						display="flex"
						alignItems="flex-start"
						justifyContent="center"
						h="48"
					>
						<Spinner size={'md'} variant="primary" />
					</Flex>
				}
			>
				{coursesList.map((course) => (
					<CourseItem key={course.id} course={course} />
				))}
			</InfiniteScroll>
		</CourseListContainer>
	);
};
