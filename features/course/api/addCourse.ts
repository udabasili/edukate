import { UDEMY } from '@/data/udemy';
import { CourseType } from '@/features/courses/types';
import { firestoredb } from '@/lib/firebase';
import { addDoc, collection, doc, setDoc } from 'firebase/firestore';
import { v4 as uuidv4 } from 'uuid';
import { FAQ } from '../types';

export type CourseCredentialsDTO = {
	faq: FAQ[];
} & Omit<CourseType, 'id' | 'rating'>;

export const addCourse = async (newCourse: CourseCredentialsDTO) => {
	const courseResponse = await addDoc(collection(firestoredb, 'courses'), newCourse);
	const courseId = courseResponse.id;
	return courseId;
};
