import React, { useEffect, useState } from 'react';
import { MainLayout } from '@/components/Layout';
import { CourseList, Filter, Sort } from '@/features/courses';
import { CourseType } from '@/features/courses/types';
import category from '@/data/categories';
import { FilterMobileButton } from '@/features/courses/components/index.styled';
import { isBrowser } from 'react-device-detect';
import { size } from '@/utils/responsive';
import { useDisclosure } from '../hook';
import { CustomDrawer } from '@/components/Elements';
import {
	collection,
	DocumentData,
	QuerySnapshot,
	getDocs,
	limit,
	query,
	QueryDocumentSnapshot,
	startAfter,
	orderBy,
} from 'firebase/firestore';
import { firestoredb } from '@/lib/firebase';
import { getAllCourses } from '@/features/courses/api/getAllCourses';
import { withProtected } from '@/hook/route';
import { useFirestoreInfiniteQuery, useFirestoreQuery } from '@react-query-firebase/firestore';

const levels = ['beginner', 'intermediate', 'expert', 'all'] as const;

type Filter = {
	categories: Array<typeof category.categoryName[number]>;
	rating: number;
	level: typeof levels[number];
};

const LIMIT = 10;

const Courses = () => {
	const [courses, setCourses] = useState<Array<CourseType>>([]);
	const [currentPage, setPage] = useState(1);
	const [hasNextPage, setHasNextPage] = useState(true);
	const coursesCollection = collection(firestoredb, 'courses');
	const coursesQuery = query(coursesCollection, orderBy('link_name'), limit(LIMIT));
	const {
		data,
		isLoading,
		fetchNextPage,
		fetchPreviousPage,
		isFetchingNextPage,
		isFetching,
		error,
		status,
		isFetchingPreviousPage,
	} = useFirestoreInfiniteQuery(
		'courses',
		coursesQuery,
		(snapshot) => {
			const lastDocument = snapshot.docs[snapshot.docs.length - 1];
			// if (!lastDocument) {
			// 	setHasNextPage(false);
			// 	remove();
			// 	return;
			// }
			return query(coursesQuery, startAfter(lastDocument));
		},
		{}
	);

	useEffect(() => {
		if (hasNextPage || currentPage) {
			const datas: DocumentData[] = [];
			console.log(data?.pages);
			data?.pages.forEach((page) =>
				page.docs.map((docSnapshot) => {
					const data = docSnapshot.data();
					datas.push(data);
				})
			);
			setHasNextPage(true);
			const startIndex = (currentPage - 1) * LIMIT;
			const endIndex = startIndex + LIMIT - 1;
			console.log(startIndex, endIndex);
			const currentPageData = datas.slice(startIndex, endIndex) as CourseType[];

			setCourses([...currentPageData]);
		}
	}, [currentPage, data?.pages]);

	if (isLoading || isFetching) {
		<MainLayout title="Courses">
			return <div>Loading...</div>;
		</MainLayout>;
	}
	return status === 'loading' ? (
		<p>Loading...</p>
	) : status === 'error' ? (
		<p>Error: {error.message}</p>
	) : (
		<>
			{data?.pages.map((group, i) => (
				<React.Fragment key={i}>
					{group.docs.map((project) => (
						<p key={project.id}>{project.data().link_name}</p>
					))}
				</React.Fragment>
			))}
			<div>
				<button onClick={() => fetchNextPage()} disabled={!hasNextPage || isFetchingNextPage}>
					{isFetchingNextPage ? 'Loading more...' : hasNextPage ? 'Load More' : 'Nothing more to load'}
				</button>
				<button onClick={() => fetchPreviousPage()}>
					{isFetchingPreviousPage ? 'Loading more...' : hasNextPage ? 'Load Less' : 'Nothing more to load'}
				</button>
			</div>
			<div>{isFetching && !isFetchingNextPage ? 'Fetching...' : null}</div>
		</>
	);

	// return (
	// 	<MainLayout title="Courses">
	// 		<Sort />
	// 		<CourseList
	// 			coursesList={courses}
	// 			fetchNextPage={fetchNextPage}
	// 			hasNextPage={hasNextPage}
	// 			hasPreviousPage={Boolean(hasPreviousPage)}
	// 			fetchPreviousPage={fetchPreviousPage}
	// 			setPage={setPage}
	// 			page={currentPage}
	// 		/>
	// 	</MainLayout>
	// );
};

export default Courses;
