import { LoadingScreen } from '@/components/Elements';
import { auth } from '@/lib/firebase';
import { Context } from '@/store/appContext';
import { User } from 'firebase/auth';
import React, { useContext, useEffect, useState } from 'react';
import { getUser } from '../api/getUser';
import { UserResponse } from '../types';

type ProviderProps = {
	children: React.ReactNode;
};

const FirebaseAuthState = ({ children }: ProviderProps) => {
	const { setCurrentUser } = useContext(Context);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		const unsubscribe = auth.onAuthStateChanged(authStateChanged);
		return () => unsubscribe();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	const authStateChanged = async (authState: User | null) => {
		setLoading(true);

		if (!authState) {
			setCurrentUser({} as UserResponse);
			setLoading(false);

			return;
		} else {
			try {
				const user = await getUser(authState.uid);
				setCurrentUser(user);
				setLoading(false);
			} catch (error) {
				setLoading(false);
				console.error(error);
			}
		}
	};

	if (loading) {
		return <LoadingScreen />;
	}
	return <>{children}</>;
};

export default FirebaseAuthState;
