import { firestoredb } from '@/lib/firebase';
import { FirebaseError } from 'firebase/app';
import { addDoc, collection } from 'firebase/firestore';
import { toast } from 'react-toastify';

export type CartCredentialsDTO = any

export const addToClass = async (cartItem: CartCredentialsDTO) => {
	try {
		const courseResponse = await addDoc(collection(firestoredb, 'courses'), cartItem);
		const courseId = courseResponse.id;
		toast.success('Added to Cart');

		return courseId;
	} catch (error) {
		let errorMessage = '';
		const errorObject = error as FirebaseError;
		toast.error(errorObject.message);
	}
};
