import { MainLayout } from '@/components/Layout';
import { ShoppingCartList, ShoppingCartSummary } from '@/features/shopping-cart';
import { withProtected } from '@/hook/route';
import { Flex, Heading } from '@chakra-ui/react';
import { withAuthUser, AuthAction } from 'next-firebase-auth';
import React, { useState } from 'react';

const ShoppingCart = () => {
	const [total, setTotal] = useState<number | null>(null);

	return (
		<MainLayout title="Shopping Cart">
			<Flex gridColumnStart={1} gridColumnEnd={-1}>
				<Heading as="h2" size="3xl" color="primaryDark" my="2rem" px="2.5">
					Shopping Cart
				</Heading>
			</Flex>
			<ShoppingCartList setTotal={setTotal} />
			<ShoppingCartSummary total={total} />
		</MainLayout>
	);
};

export default withProtected(ShoppingCart);
