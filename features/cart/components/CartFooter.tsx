import { Flex, Button, Heading } from '@chakra-ui/react';
import React, { useState } from 'react';
import NextLink from 'next/link';

type Props = {
	total: number | null;
};

export const CartFooter = ({ total }: Props) => {
	return (
		<Flex direction="column" justifyContent="flex-start" p={4}>
			<Heading as="h4" size="md">
				Total: ${total}
			</Heading>
			<NextLink href="/shopping-cart" passHref>
				<Button bgColor="secondary" size="lg" color="white" mt="2">
					Go to Cart
				</Button>
			</NextLink>
		</Flex>
	);
};
