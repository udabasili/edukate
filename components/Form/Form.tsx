import { VStack } from '@chakra-ui/react';
import React from 'react';
import { FormContainer } from './index.styled';

type Props = {
	children: React.ReactNode;
};

export const CustomForm = (props: Props) => {
	const { children } = props;
	return (
		<FormContainer>
			<VStack spacing={4} align="flex-start">
				{children}
			</VStack>
		</FormContainer>
	);
};
