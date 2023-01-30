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
import { collection, DocumentData, getDocs, limit, query, QueryDocumentSnapshot, startAfter } from 'firebase/firestore';
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

	const [filters, setFilter] = useState<Filter>({} as Filter);
	const [filterSelected, setFilterSelected] = useState(false);
	const [hasMore, setHasMore] = useState(true);
	const [lastVisible, setLastVisible] = useState<QueryDocumentSnapshot<DocumentData>>();
	const { onOpen, onClose, isOpen } = useDisclosure();
	const [filteredCourses, setFilteredCourses] = useState<Array<CourseType>>([]);
	const [unfilteredCourses, setUnfilteredCourses] = useState<Array<CourseType>>([]);
	const [browserSize, setIsBrowser] = useState(isBrowser);

	useEffect(() => {
		(async () => {
			const { courses, lastVisible } = await getAllCourses(LIMIT);
			setUnfilteredCourses(courses);
			setLastVisible(lastVisible);
		})();
	}, []);

	const setIsBrowserHandler = () => {
		setIsBrowser(window.innerWidth > Number(size.tabletPort.replace('px', '')));
	};

	useEffect(() => {
		if (filterSelected && filteredCourses.length === 0) {
			setHasMore(false);
			return;
		}
		setHasMore(true);
	}, [filteredCourses, unfilteredCourses]);

	useEffect(() => {
		setIsBrowserHandler();
		window.addEventListener('resize', setIsBrowserHandler);

		return () => {
			window.removeEventListener('resize', setIsBrowserHandler);
		};
	}, []);

	async function fetchMoreData() {
		const next = query(collection(firestoredb, 'courses'), startAfter(lastVisible), limit(10));
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
		filterFunction();
	}

	useEffect(() => {
		if (Object.keys(filters).length !== 0) {
			filterFunction();
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
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

	if (filterSelected) {
		courses = filteredCourses;
	} else {
		courses = unfilteredCourses;
	}

	return (
		<MainLayout title="Courses">
			<Sort />
			<FilterMobileButton colorScheme="teal" size="md" onClick={onOpen}>
				Filter
			</FilterMobileButton>
			<Filter
				setFilter={setFilter}
				hideCategoriesFilter={false}
				filterSelected={filterSelected}
				setFilterSelected={setFilterSelected}
			/>
			<CourseList coursesList={courses} fetchMoreData={fetchMoreData} hasMore={hasMore} />
			{!browserSize ? (
				<CustomDrawer isOpen={isOpen} onClose={onClose} title="Filter" onSubmit={function (): void {}}>
					<Filter
						setFilter={setFilter}
						hideCategoriesFilter={false}
						className="filter-mobile"
						filterSelected={filterSelected}
						setFilterSelected={setFilterSelected}
						style={{
							display: 'flex',
						}}
					/>
				</CustomDrawer>
			) : null}
		</MainLayout>
	);
};

export default withProtected(Courses);
