import { LoadingScreen } from '@/components/Elements';
import { Context } from '@/store/appContext';
import { NextPage } from 'next';
import { useRouter } from 'next/router';
import React, { useContext, useEffect, useState } from 'react';

type DefaultProps = {
	[x: string]: any;
};

export function withProtected<T extends DefaultProps>(Component: NextPage<T>) {
	return function WithProtected(props: T) {
		const router = useRouter();
		const { isAuthenticated } = useContext(Context);
		const [isLoading, setLoading] = useState(!isAuthenticated);

		useEffect(() => {
			if (!isAuthenticated) {
				router.push('/auth');
				return;
			}
			setLoading(false);
			// eslint-disable-next-line react-hooks/exhaustive-deps
		}, [isAuthenticated]);

		if (isLoading) {
			return <LoadingScreen />;
		}
		return <Component {...props} />;
	};
}

export function withPublic<T extends DefaultProps>(Component: React.FC<T>) {
	return function WithPublic(props: T) {
		const router = useRouter();
		const { isAuthenticated } = useContext(Context);

		if (isAuthenticated) {
			router.replace('/');
			return <LoadingScreen />;
		}
		return <Component {...props} />;
	};
}
