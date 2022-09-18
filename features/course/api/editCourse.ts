import { UDEMY } from '@/data/udemy';
import { CourseType } from '@/features/courses/types';
import { firestoredb } from '@/lib/firebase';
import { doc, setDoc, updateDoc } from 'firebase/firestore';
import { v4 as uuidv4 } from 'uuid';
import { FAQ } from '../types';

export type CourseCredentialsDTO = {
	faq: FAQ[];
} & Omit<CourseType, 'id' | 'rating'>;

export const editCourse = async (updateCourse: CourseCredentialsDTO, courseId: string) => {
	const courseRef = doc(firestoredb, 'courses', courseId);
	await updateDoc(courseRef, updateCourse);
};
