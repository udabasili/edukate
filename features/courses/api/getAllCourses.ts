import { firestoredb } from '@/lib/firebase';
import {
	collection,
	DocumentData,
	getDocs,
	limit,
	orderBy,
	Query,
	query,
	QueryDocumentSnapshot,
} from 'firebase/firestore';
import React from 'react';
import { CourseType } from '../types';
const coursesRef = collection(firestoredb, 'courses');

type Props = {
	limitNo?: number;
};

type Return = {
	lastVisible: QueryDocumentSnapshot<DocumentData>;
	courses: Array<CourseType>;
};
export const getAllCourses = async (limitNo?: number): Promise<Return> => {
	const courses: Array<CourseType> = [];
	let first: Query<DocumentData>;
	first = limitNo ? query(coursesRef, limit(limitNo), orderBy('link_name')) : query(coursesRef, orderBy('link_name'));
	const querySnapshot = await getDocs(first);
	querySnapshot.forEach((doc) => {
		courses.push({
			...(doc.data() as CourseType),
			id: doc.id,
		});
	});
	const documentSnapshots = await getDocs(first);
	const lastVisible = documentSnapshots.docs[documentSnapshots.docs.length - 1];

	return {
		lastVisible,
		courses,
	};
};
