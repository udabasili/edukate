import React, { useContext, useEffect, useState } from 'react';
import { Img, Text, Flex, Grid, Heading, GridItem, Spinner } from '@chakra-ui/react';
import { collection, onSnapshot, query, where } from 'firebase/firestore';
import { firestoredb } from '@/lib/firebase';
import { CartResponse } from '../types';
import { CartItem } from './CartItem';
import { Context } from '@/store/appContext';

type Props = {
	setTotal: (e: number) => void;
};

export const CartList = (props: Props) => {
	const { setTotal } = props;
	const [cartItems, setCartItems] = useState<CartResponse[]>([]);
	const [isLoading, setIsLoading] = useState(true);
	const { currentUser } = useContext(Context);

	useEffect(() => {
		setIsLoading(true);
		const q = query(collection(firestoredb, 'cart'), where('studentId', '==', currentUser.userId));
		let total = 0;
		const unsubscribe = onSnapshot(q, (querySnapshot) => {
			const cartItems: CartResponse[] = [];
			querySnapshot.forEach((doc) => {
				const cartObject = doc.data() as CartResponse;
				total += cartObject.price;
				cartItems.push({
					...cartObject,
				});
			});
			setTotal(total);
			setCartItems(cartItems);
		});
		setIsLoading(false);

		return () => {
			unsubscribe();
		};
	}, []);

	return (
		<Flex direction="column">
			{isLoading ? (
				<Spinner size={'lg'} variant="primary" alignSelf="center" />
			) : (
				cartItems.map((item, i) => <CartItem key={i} courseId={item.courseId} />)
			)}
		</Flex>
	);
};
