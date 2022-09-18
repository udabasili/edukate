import { database } from '@/lib/firebase';
import { ref, get, child } from 'firebase/database';
import { useAuthUser } from 'next-firebase-auth';
import React from 'react';
import { UserResponse } from '../types';

export const getUser = async (uid: string) => {
	let user: UserResponse = {} as UserResponse;
	const dbRef = ref(database);
	const snapshot = await get(child(dbRef, `users/${uid}`));
	if (snapshot.exists()) {
		const UserObject = snapshot.val() as UserResponse;
		user = {
			...UserObject,
			userId: uid,
		};
	}
	return user;
};
