import { CourseType } from '@/features/courses/types';
import { firestoredb } from '@/lib/firebase';
import { useDocument } from '@nandorojo/swr-firestore';
import { doc, getDoc } from 'firebase/firestore';
import courses from 'pages/courses';
import React from 'react';
import { useCollection } from 'swr-firestore-v9';

export const getCourseById = async (courseId: string) => {
	let currentCourse: CourseType | null = null;
	const docRef = doc(firestoredb, 'courses', courseId);
	const docSnap = await getDoc(docRef);

	if (docSnap.exists()) {
		currentCourse = currentCourse = {
			...docSnap.data(),
			id: docSnap.id,
		} as CourseType;
	} else {
		console.log('No such document!');
	}

	return currentCourse;
};
