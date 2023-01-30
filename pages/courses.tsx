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
	getDocs,
	limit,
	orderBy,
	query,
	QueryDocumentSnapshot,
	startAfter,
} from 'firebase/firestore';
import { firestoredb } from '@/lib/firebase';
import { getAllCourses } from '@/features/courses/api/getAllCourses';
import { withProtected } from '@/hook/route';

const levels = ['beginner', 'intermediate', 'expert', 'all'] as const;

type Filter = {
	categories: Array<typeof category.categoryName[number]>;
	rating: number;
	level: typeof levels[number];
};

const LIMIT = 10;

const Courses = () => {
	let courses: Array<CourseType> = [];

	const [hasMore, setHasMore] = useState(true);
	const [lastVisible, setLastVisible] = useState<QueryDocumentSnapshot<DocumentData>>();
	const [unfilteredCourses, setUnfilteredCourses] = useState<Array<CourseType>>([]);

	useEffect(() => {
		(async () => {
			const { courses, lastVisible } = await getAllCourses(LIMIT);
			setUnfilteredCourses(courses);
			setLastVisible(lastVisible);
		})();
	}, []);

	async function fetchMoreData() {
		const next = query(
			collection(firestoredb, 'courses'),
			orderBy('link_name'),
			startAfter(lastVisible),
			limit(10)
		);
		const documentSnapshots = await getDocs(next);
		const newCourses: Array<CourseType> = [];
		documentSnapshots.forEach((doc) => {
			newCourses.push({
				...(doc.data() as CourseType),
				id: doc.id,
			});
		});
		setUnfilteredCourses([...unfilteredCourses, ...newCourses]);
		const last = documentSnapshots.docs[documentSnapshots.docs.length - 1];
		setLastVisible(last);
	}

	return (
		<MainLayout title="Courses">
			<Sort />
			<CourseList coursesList={unfilteredCourses} fetchMoreData={fetchMoreData} hasMore={hasMore} />
		</MainLayout>
	);
};

export default Courses;
