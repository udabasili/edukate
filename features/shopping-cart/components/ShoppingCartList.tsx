import { Spinner } from '@/components/Elements';
import { CartResponse } from '@/features/cart/types';
import { CourseType } from '@/features/courses/types';
import { firestoredb } from '@/lib/firebase';
import { Context } from '@/store/appContext';
import { Text, Grid, GridItem, Heading, Img, Flex, ListItem, UnorderedList } from '@chakra-ui/react';
import { query, collection, where, onSnapshot, doc, getDoc } from 'firebase/firestore';
import React, { useContext, useEffect, useState } from 'react';
import { ShoppingCartListContainer } from './index.styled';
import { ShoppingCartItem } from './ShoppingCartItem';

type Props = {
	setTotal: (e: number) => void;
};

type CartItem = {
	cartId: string;
} & CourseType;

export const ShoppingCartList = ({ setTotal }: Props) => {
	const [cartItems, setCartItems] = useState<CartItem[]>([]);
	const [isLoading, setIsLoading] = useState(true);
	const { currentUser } = useContext(Context);

	useEffect(() => {
		setIsLoading(true);
		const q = query(collection(firestoredb, 'cart'), where('studentId', '==', currentUser.userId));
		let total = 0;
		const unsubscribe = onSnapshot(q, (querySnapshot) => {
			const cartItems: CartItem[] = [];

			querySnapshot.forEach(async (document) => {
				const cartObject = document.data() as CartResponse;
				const docRef = doc(firestoredb, 'courses', cartObject.courseId);
				const docSnap = await getDoc(docRef);
				if (docSnap.exists()) {
					total += cartObject.price;
					cartItems.push({
						...(docSnap.data() as CartItem),
						id: docSnap.id,
						cartId: document.id,
					});
				} else {
					console.log('No such document!');
				}
				setTotal(total);
				setCartItems(cartItems);
			});
		});
		setIsLoading(false);

		return () => {
			unsubscribe();
		};
	}, []);

	return (
		<ShoppingCartListContainer flexDirection="column">
			{!isLoading ? (
				<>
					<Heading as="h4" size="md">
						{cartItems.length === 0 ? null : `${cartItems.length} item in Cart`}
					</Heading>
					<Flex flexDirection="column" mt={5} position="relative">
						{cartItems.map((item, i) => (
							<ShoppingCartItem item={item} key={item.id} />
						))}
					</Flex>
				</>
			) : (
				<Spinner
					size={'md'}
					variant="primary"
					style={{
						position: 'absolute',
						left: '50%',
					}}
				/>
			)}
		</ShoppingCartListContainer>
	);
};
