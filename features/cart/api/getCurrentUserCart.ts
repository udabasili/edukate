import { auth, firestoredb } from '@/lib/firebase';
import { addDoc, collection, getDocs, query, where } from 'firebase/firestore';
import React from 'react';
import { CartResponse } from '../types';
import { CartCredentialsDTO } from './addItemToCart';

export const getCurrentUserCart = async () => {
	const cartItems: CartResponse[] = [];
	const currentUserId = auth.currentUser?.uid;
	const cartRef = collection(firestoredb, 'cart');
	const q = query(cartRef, where('studentId', '==', currentUserId));
	const querySnapshot = await getDocs(q);
	querySnapshot.forEach((doc) => {
		cartItems.push({
			...(doc.data() as CartResponse),
			id: doc.id,
		});
	});
	return cartItems;
};
