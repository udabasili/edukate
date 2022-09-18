import { firestoredb } from '@/lib/firebase';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { Enrollment } from '../types';

export const getCurrentUserClasses = async (currentUserId: string) => {
	const courseIds: string[] = [];
	console.log(courseIds);
	const q = query(collection(firestoredb, 'enrollment'), where('studentId', '==', currentUserId));
	const querySnapshot = await getDocs(q);
	querySnapshot.forEach((doc) => {
		const enrolledObject = doc.data() as Enrollment;
		courseIds.push(enrolledObject.courseId);
	});
	return courseIds;
};
