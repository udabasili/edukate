import { Accordion, AccordionButton, AccordionIcon, AccordionItem, AccordionPanel, Box, Text } from '@chakra-ui/react';
import React from 'react';
import { FAQ } from '@/features/course/types';

type Props = {
	faq: Array<FAQ>;
};

export const FAQSection = (props: Props) => {
	const { faq } = props;
	return (
		<div>
			<Accordion allowToggle>
				{faq.map((item) => (
					<AccordionItem key={item.question}>
						<h2>
							<AccordionButton>
								<Box flex="1" textAlign="left" fontSize="1rem">
									{item.question}
								</Box>
								<AccordionIcon />
							</AccordionButton>
						</h2>
						<AccordionPanel pb={4} fontSize="1rem">
							{item.answer}
						</AccordionPanel>
					</AccordionItem>
				))}
			</Accordion>
		</div>
	);
};
