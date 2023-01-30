import React, { useEffect, useState } from 'react';
import type { GetServerSideProps, NextPage } from 'next';
import { MainLayout } from '@/components/Layout';
import { CourseList, Filter, Sort } from '@/features/courses';
import { CourseType } from '@/features/courses/types';
import category from '@/data/categories';
import { useRouter } from 'next/router';
import { Flex, Heading } from '@chakra-ui/react';
import { useDisclosure } from '@/hook/useDisclosure';
import {
	collection,
	DocumentData,
	getDocs,
	limit,
	query,
	QueryDocumentSnapshot,
	startAfter,
	where,
} from 'firebase/firestore';
import { firestoredb } from '@/lib/firebase';
import _ from 'lodash';
import { withProtected } from '@/hook/route';

const levels = ['beginner', 'intermediate', 'expert', 'all'] as const;

type Filter = {
	categories: Array<typeof category.categoryName[number]>;
	rating: number;
	level: typeof levels[number];
};

type Props = {
	category: string;
};

const LIMIT = 10;
const Category: NextPage<Props> = ({ category }) => {
	const router = useRouter();
	const { pid } = router.query;
	const [hasMore, setHasMore] = useState(true);
	const [lastVisible, setLastVisible] = useState<QueryDocumentSnapshot<DocumentData>>();
	const [courses, setCourses] = useState<Array<CourseType>>([]);

	useEffect(() => {
		setCourses([]);
		const coursesRef = collection(firestoredb, 'courses');

		(async () => {
			const first = query(coursesRef, where('category', '==', _.startCase(_.toLower(category))), limit(LIMIT));
			const querySnapshot = await getDocs(first);
			const filteredCoursesByCategory: Array<CourseType> = [];

			querySnapshot.forEach((doc) => {
				filteredCoursesByCategory.push({
					...(doc.data() as CourseType),
					id: doc.id,
				});
			});

			const documentSnapshots = await getDocs(first);
			const lastVisible = documentSnapshots.docs[documentSnapshots.docs.length - 1];
			setCourses([...filteredCoursesByCategory]);
			setLastVisible(lastVisible);
			setHasMore(true);
		})();
	}, [category]);

	async function fetchMoreData() {
		const next = query(
			collection(firestoredb, 'courses'),
			where('category', '==', _.startCase(_.toLower(category))),
			startAfter(lastVisible),
			limit(LIMIT)
		);

		const documentSnapshots = await getDocs(next);
		console.log(documentSnapshots, next);
		const newCourses: Array<CourseType> = [];
		documentSnapshots.forEach((doc) => {
			newCourses.push({
				...(doc.data() as CourseType),
				id: doc.id,
			});
		});
		setCourses([...courses, ...newCourses]);
		const last = documentSnapshots.docs[documentSnapshots.docs.length - 1];
		if (!last) {
			setHasMore(false);
			return;
		}
		setLastVisible(last);
	}

	return (
		<MainLayout title={(pid as string).toUpperCase()}>
			<Flex gridColumnStart={1} gridColumnEnd={-1}>
				<Heading as="h2" size="3xl" color="primaryDark" my="2rem" px="2.5">
					{(pid as string).toUpperCase()}
				</Heading>
			</Flex>

			<Sort />

			<CourseList coursesList={courses} fetchMoreData={fetchMoreData} hasMore={hasMore} />
		</MainLayout>
	);
};

export const getServerSideProps: GetServerSideProps = async (context) => {
	const category = context.query.pid as string;

	return { props: { category } };
};

export default Category;
