import { UserResponse } from '../types';
import { getAuth, createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { auth, database } from '@/lib/firebase';
import { ref, set } from 'firebase/database';

export type RegisterCredentialsDTO = {
	email: string;
	password: string;
	name: string;
	type: string;
	imageUrl: string;
};

export const registerWithEmailAndPassword = async (data: RegisterCredentialsDTO) => {
	const { email, password, ...others } = data;
	const response = await createUserWithEmailAndPassword(auth, email, password);
	set(ref(database, 'users/' + response.user.uid), {
		email,
		...others,
	});
	if (auth.currentUser) {
		await updateProfile(auth.currentUser, {
			displayName: others.name,
			photoURL: others.imageUrl,
		});
	}
};
