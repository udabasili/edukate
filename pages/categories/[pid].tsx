import React, { useEffect, useState } from 'react';
import type { GetServerSideProps, NextPage } from 'next';
import { MainLayout } from '@/components/Layout';
import { CourseList, Filter, Sort } from '@/features/courses';
import { CourseType } from '@/features/courses/types';
import { UDEMY } from '@/data/udemy';
import category from '@/data/categories';
import { useRouter } from 'next/router';
import { SectionHeader } from '@/components/SectionHeader';
import { Flex, Heading } from '@chakra-ui/react';
import { FilterMobileButton } from '@/features/courses/components/index.styled';
import { CustomDrawer } from '@/components/Elements';
import { size } from '@/utils/responsive';
import { isBrowser } from 'react-device-detect';
import { useDisclosure } from '@/hook/useDisclosure';
import {
	collection,
	DocumentData,
	getDocs,
	limit,
	orderBy,
	query,
	QueryDocumentSnapshot,
	startAfter,
	where,
} from 'firebase/firestore';
import { firestoredb } from '@/lib/firebase';
import _ from 'lodash';
import { AuthAction, withAuthUser } from 'next-firebase-auth';
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
	let courses: Array<CourseType> = [];
	const { pid } = router.query;

	const { onOpen, onClose, isOpen } = useDisclosure();
	const [hasMore, setHasMore] = useState(true);

	const [filters, setFilter] = useState<Filter>({} as Filter);
	const [filterSelected, setFilterSelected] = useState(false);
	const [lastVisible, setLastVisible] = useState<QueryDocumentSnapshot<DocumentData>>();
	const [filteredCourses, setFilteredCourses] = useState<Array<CourseType>>([]);
	const [unfilteredCourses, setUnfilteredCourses] = useState<Array<CourseType>>([]);

	useEffect(() => {
		setUnfilteredCourses([]);
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
			setUnfilteredCourses(filteredCoursesByCategory);
			setLastVisible(lastVisible);
		})();
	}, [category]);

	useEffect(() => {
		if (filterSelected && filteredCourses.length === 0) {
			setHasMore(false);
			return;
		}
		setHasMore(true);
	}, [filteredCourses, unfilteredCourses]);

	async function fetchMoreData() {
		const next = query(
			collection(firestoredb, 'courses'),
			where('category', '==', _.startCase(_.toLower(category))),
			startAfter(lastVisible),
			limit(LIMIT)
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
		// Get the last visible document
		const last = documentSnapshots.docs[documentSnapshots.docs.length - 1];
		setLastVisible(last);
		filterFunction();
	}

	useEffect(() => {
		if (Object.keys(filters).length !== 0) {
			filterFunction();
		}
	}, [filters]);

	function filterFunction() {
		if (Object.keys(filters).length !== 0) {
			const currentCourses = unfilteredCourses
				.filter((course) => {
					if (filters.categories.length !== 0) {
						return filters.categories.includes(course.category);
					}
					return course;
				})
				.filter((course) => {
					if (filters.rating) {
						return course.rating >= filters.rating;
					}
					return course;
				})
				.filter((course) => {
					if (filters.level) {
						if (filters.level === 'all') {
							return course;
						} else {
							return course.level === filters.level;
						}
					}
					return course;
				});
			setFilteredCourses([...currentCourses]);
		}
	}

	if (filteredCourses.length !== 0) {
		courses = filteredCourses;
	} else {
		courses = unfilteredCourses;
	}

	return (
		<MainLayout title={(pid as string).toUpperCase()}>
			<Flex gridColumnStart={1} gridColumnEnd={-1}>
				<Heading as="h2" size="3xl" color="primaryDark" my="2rem" px="2.5">
					{(pid as string).toUpperCase()}
				</Heading>
			</Flex>

			<Sort />
			<FilterMobileButton colorScheme="primaryDark" size="lg" onClick={onOpen}>
				Filter
			</FilterMobileButton>

			<Filter
				hideCategoriesFilter
				setFilter={setFilter}
				filterSelected={filterSelected}
				setFilterSelected={setFilterSelected}
			/>
			<CourseList coursesList={courses} fetchMoreData={fetchMoreData} hasMore={hasMore} />
			<CustomDrawer isOpen={isOpen} onClose={onClose} title="Search" onSubmit={function (): void {}}>
				<Filter
					hideCategoriesFilter
					setFilter={setFilter}
					className="mobile"
					filterSelected={filterSelected}
					setFilterSelected={setFilterSelected}
				/>
			</CustomDrawer>
		</MainLayout>
	);
};

export const getServerSideProps: GetServerSideProps = async (context) => {
	const category = context.query.pid as string;

	return { props: { category } };
};

export default withProtected<Props>(Category);
