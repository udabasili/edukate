import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '@/lib/firebase';

export type LoginCredentialsDTO = {
	email: string;
	password: string;
};

export const login = async (data: LoginCredentialsDTO) => {
	const { email, password } = data;
	const response = await signInWithEmailAndPassword(auth, email, password);
};
