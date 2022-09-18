import React, { useContext, useMemo, useState } from 'react';
import { StripeCardElement, StripeCardNumberElement } from '@stripe/stripe-js';
import {
	CardElement,
	useStripe,
	useElements,
	ElementsConsumer,
	CardCvcElement,
	CardExpiryElement,
	CardNumberElement,
} from '@stripe/react-stripe-js';
import useResponsiveFontSize from '@/hook/useResponsiveFontSize';
import { CheckoutFormContainer } from './index.styled';
import { FormControl, FormLabel, Button } from '@chakra-ui/react';
import { toast } from 'react-toastify';
import { addDoc, collection, deleteDoc, doc, serverTimestamp, setDoc, Timestamp, updateDoc } from 'firebase/firestore';
import { firebaseErrors } from '@/data/firebaseErrors';
import { firestoredb } from '@/lib/firebase';
import { Context } from '@/store/appContext';
import { useRouter } from 'next/router';

const useOptions = () => {
	const fontSize = useResponsiveFontSize();
	const options = useMemo(
		() => ({
			style: {
				base: {},
				invalid: {
					color: '#9e2146',
				},
			},
		}),
		[fontSize]
	);

	return options;
};

type Props = {
	cartIds: string[];
	courseIds: string[];
};

export const CheckoutForm = ({ cartIds, courseIds }: Props) => {
	const stripe = useStripe();
	const elements = useElements();
	const options = useOptions();
	const [isLoading, setIsLoading] = useState(false);
	const { currentUser } = useContext(Context);
	const router = useRouter();

	async function deleteCartItems() {
		Promise.all(cartIds.map(async (cartId) => await deleteDoc(doc(firestoredb, 'cart', cartId))));
	}

	async function addToClass() {
		return Promise.all(
			courseIds.map(async (courseId) => {
				console.log(courseId);
				return await addDoc(collection(firestoredb, 'enrollment'), {
					studentId: currentUser.userId,
					courseId,
					enrollmentDate: new Date(),
				});
			})
		);
	}

	const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();

		if (!stripe || !elements) {
			return;
		}
		setIsLoading(true);
		try {
			if (stripe) {
				const result = await stripe.createPaymentMethod({
					type: 'card',
					card: elements.getElement(CardNumberElement) as StripeCardNumberElement,
				});
				if (result.error) {
					throw new Error(result.error.message);
				} else {
					await deleteCartItems();
					await addToClass();
					setIsLoading(false);
					toast.success('Classes joined successfully');
					router.push('/my-classes');
				}
			}
		} catch (e) {
			setIsLoading(false);

			const errorObject = e as Error;
			toast.error(errorObject.message);
		}
	};

	return (
		<ElementsConsumer>
			{({ stripe, elements }) => (
				<CheckoutFormContainer onSubmit={handleSubmit}>
					<FormControl mb={4}>
						<FormLabel fontWeight="bold">Card number</FormLabel>
						<CardNumberElement
							options={options}
							onReady={() => {
								console.log('CardNumberElement [ready]');
							}}
							onChange={(event) => {
								console.log('CardNumberElement [change]', event);
							}}
							onBlur={() => {
								console.log('CardNumberElement [blur]');
							}}
							onFocus={() => {
								console.log('CardNumberElement [focus]');
							}}
						/>
					</FormControl>
					<FormControl mb={4}>
						<FormLabel fontWeight="bold"> Expiration date</FormLabel>
						<CardExpiryElement
							options={options}
							onReady={() => {
								console.log('CardNumberElement [ready]');
							}}
							onChange={(event) => {
								console.log('CardNumberElement [change]', event);
							}}
							onBlur={() => {
								console.log('CardNumberElement [blur]');
							}}
							onFocus={() => {
								console.log('CardNumberElement [focus]');
							}}
						/>
					</FormControl>
					<FormControl mb={4}>
						<FormLabel fontWeight="bold"> Expiration date</FormLabel>
						<CardCvcElement
							options={options}
							onReady={() => {
								console.log('CardNumberElement [ready]');
							}}
							onChange={(event) => {
								console.log('CardNumberElement [change]', event);
							}}
							onBlur={() => {
								console.log('CardNumberElement [blur]');
							}}
							onFocus={() => {
								console.log('CardNumberElement [focus]');
							}}
						/>
					</FormControl>
					<Button
						color="white"
						size="md"
						type="submit"
						backgroundColor="primaryDark"
						isLoading={isLoading}
						disabled={!stripe}
					>
						Pay Now
					</Button>
				</CheckoutFormContainer>
			)}
		</ElementsConsumer>
	);
};
