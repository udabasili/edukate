import { CartResponse } from '@/features/cart/types';
import { CourseType } from '@/features/courses/types';
import { firestoredb } from '@/lib/firebase';
import { Context } from '@/store/appContext';
import { Text, Grid, GridItem, Heading, Img, Flex, ListItem, UnorderedList } from '@chakra-ui/react';
import { query, collection, where, onSnapshot, doc, getDoc, deleteDoc } from 'firebase/firestore';
import React, { useContext, useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { ShoppingCartListContainer } from './index.styled';

type CartItem = {
	cartId: string;
} & CourseType;

type Props = {
	item: CartItem;
};

export const ShoppingCartItem = ({ item }: Props) => {
	async function deleteItemFromCart() {
		try {
			await deleteDoc(doc(firestoredb, 'cart', item.cartId));
			toast.success('Removed from Cart');
		} catch (error) {
			toast.error((error as Error).message);
		}
	}

	return (
		<Grid
			gridTemplateColumns="1fr 1fr min-content min-content"
			gridTemplateRows="repeat(4, min-content)"
			key={item.id}
			width="100%"
			mt={7}
			columnGap={5}
		>
			<GridItem rowStart={1} rowEnd={-1} bg="papayawhip" width="auto" height="100%">
				<Img src={item.image_url} alt={item.link_name} width="auto" height="100%" />
			</GridItem>
			<GridItem colSpan={1} rowStart={1}>
				<Heading as="h5" size="sm">
					{item.link_name}
				</Heading>
			</GridItem>
			<GridItem colSpan={1} rowStart={2}>
				{' '}
				<Text fontSize="md">{item.tutor}</Text>
			</GridItem>
			<GridItem colSpan={1} rowStart={1}>
				{/* <Text color="blue.300" fontSize="md" as="b" cursor="pointer" onClick={deleteItemFromCart}>
					Remove
				</Text> */}
			</GridItem>
			{/* <GridItem colStart={2} rowStart={4}>
				{' '}
				<Text>
					<UnorderedList display="flex" fontSize=".9 rem">
						<ListItem listStyleType="none">{item['length(minutes)']} minutes</ListItem>
						<ListItem ml={4}>{item.lectures} lectures</ListItem>
						<ListItem ml={4}> {item.level}</ListItem>
					</UnorderedList>
				</Text>
			</GridItem> */}
			<GridItem colStart={2} rowStart={3}>
				{' '}
				{/* <Text color="teal.500">Rating</Text> */}
			</GridItem>
			<GridItem colStart={2} rowStart={3}>
				{' '}
				<Text>
					<UnorderedList display="flex" fontSize=".9 rem">
						<ListItem listStyleType="none">{item['length(minutes)']} minutes</ListItem>
						<ListItem ml={4}>{item.lectures} lectures</ListItem>
						<ListItem ml={4}> {item.level}</ListItem>
					</UnorderedList>
				</Text>
			</GridItem>
			<GridItem colSpan={1} rowStart={1}>
				{' '}
				<Text fontSize="xl" as="b">
					{' '}
					${item.retail_price}
				</Text>
			</GridItem>
		</Grid>
	);
};
