import { AsideContainer } from '@/features/course';
import { Heading, ListItem, UnorderedList, Text, Box, Button } from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import { ShoppingCartSummaryContainer } from './index.styled';
import NextLink from 'next/link';
import { useRouter } from 'next/router';

type Props = {
	total: number | null;
};

export const ShoppingCartSummary = ({ total }: Props) => {
	const [afterTaxTotal, setAfterTaxTotal] = useState<number | null>(null);
	const router = useRouter();

	useEffect(() => {
		if (total) {
			const cal = total * 1.15;
			setAfterTaxTotal(cal);
		}
	}, [total]);

	const handleClick = () => {
		router.push({
			pathname: '/checkout',
			query: {
				total,
			},
		});
	};

	return (
		<ShoppingCartSummaryContainer>
			<Heading as="h4" size="md">
				Summary
			</Heading>
			{total && afterTaxTotal ? (
				<>
					<UnorderedList mt={3}>
						<ListItem>
							<Text fontSize="md">Original price: ${total}</Text>
						</ListItem>
						<ListItem>
							<Text fontSize="md">Tax Percentage: 15%</Text>
						</ListItem>
					</UnorderedList>
					<Box alignSelf="flex-end" mt={3}>
						<Heading as="h3" size="lg">
							Total: ${afterTaxTotal.toFixed(2)}
						</Heading>
					</Box>
					<Button bg="primaryDark" size="lg" mx="3rem" mt={10} color="white" onClick={handleClick}>
						Checkout
					</Button>
				</>
			) : null}
		</ShoppingCartSummaryContainer>
	);
};
