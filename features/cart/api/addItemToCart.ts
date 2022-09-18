import { firestoredb } from '@/lib/firebase';
import { FirebaseError } from 'firebase/app';
import { addDoc, collection } from 'firebase/firestore';
import { toast } from 'react-toastify';
import { CartResponse } from '../types';

export type CartCredentialsDTO = Omit<CartResponse, 'id'>;

export const addItemToCart = async (cartItem: CartCredentialsDTO) => {
	try {
		const courseResponse = await addDoc(collection(firestoredb, 'cart'), cartItem);
		const courseId = courseResponse.id;
		toast.success('Added to Cart');

		return courseId;
	} catch (error) {
		let errorMessage = '';
		const errorObject = error as FirebaseError;
		toast.error(errorObject.message);
	}
};
