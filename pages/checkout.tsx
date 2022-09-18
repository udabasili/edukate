import { MainLayout } from '@/components/Layout';
import { CartResponse } from '@/features/cart/types';
import { CheckoutForm } from '@/features/checkout';
import { ShoppingCartList, ShoppingCartSummary } from '@/features/shopping-cart';
import { withProtected } from '@/hook/route';
import { firestoredb } from '@/lib/firebase';
import { Context } from '@/store/appContext';
import { Flex, Heading } from '@chakra-ui/react';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import { collection, onSnapshot, query, where } from 'firebase/firestore';
import { GetServerSideProps, NextPage } from 'next';
import { withAuthUser, AuthAction } from 'next-firebase-auth';
import React, { useContext, useEffect, useState } from 'react';

const STRIPE = process.env.NEXT_PUBLIC_STRIPE_API as string;

type Props = {
	total: number;
};

const stripePromise = loadStripe(STRIPE);

const Checkout: NextPage<Props> = ({ total }) => {
	const { currentUser } = useContext(Context);
	const [cartIds, setCartIds] = useState<string[]>([]);
	const [courseIds, setCourseIds] = useState<string[]>([]);

	useEffect(() => {
		const q = query(collection(firestoredb, 'cart'), where('studentId', '==', currentUser.userId));
		let total = 0;
		const unsubscribe = onSnapshot(q, (querySnapshot) => {
			const cartItems: string[] = [];
			const courseIds: string[] = [];
			querySnapshot.forEach((doc) => {
				const courseObject = doc.data() as CartResponse;
				cartItems.push(doc.id);
				courseIds.push(courseObject.courseId);
			});
			setCartIds(cartItems);
			setCourseIds(courseIds);
		});

		return () => {
			unsubscribe();
		};
	}, []);

	return (
		<MainLayout title="Checkout">
			<Flex gridColumnStart={1} gridColumnEnd={-1}>
				<Heading as="h2" size="3xl" color="primaryDark" my="2rem" px="2.5">
					Checkout
				</Heading>
			</Flex>
			<Elements stripe={stripePromise}>
				<CheckoutForm cartIds={cartIds} courseIds={courseIds} />
			</Elements>
			<ShoppingCartSummary total={total} />
		</MainLayout>
	);
};

export const getServerSideProps: GetServerSideProps = async (context) => {
	const total = Number(context.query.total);

	return { props: { total } };
};

export default withProtected<Props>(Checkout);
