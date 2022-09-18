import { CloseIcon } from '@chakra-ui/icons';
import { FormControl, FormLabel, Input } from '@chakra-ui/react';
import React from 'react';
import { FAQ } from '../types';
import { Form } from './index.styled';

type Props = {
	handleFAQInputChange: (index: number, key: 'question' | 'answer', value: string) => void;
	removeFAQForm: (index: number) => void;
	value: FAQ;
	index: number;
};
export const AddFAQ = (props: Props) => {
	const { index, handleFAQInputChange, value, removeFAQForm } = props;

	const handleInputChange =
		(index: number, key: 'question' | 'answer') => (event: React.ChangeEvent<HTMLInputElement>) => {
			handleFAQInputChange(index, key, event.target.value);
		};

	return (
		<Form>
			<CloseIcon xlinkTitle="close" className="trash" fontSize="1rem" onClick={() => removeFAQForm(index)} />
			<FormControl>
				<FormLabel>Question</FormLabel>
				<Input type="text" bg="white" value={value.question} onChange={handleInputChange(index, 'question')} />
			</FormControl>
			<FormControl>
				<FormLabel>Answer</FormLabel>
				<Input type="text" bg="white" value={value.answer} onChange={handleInputChange(index, 'answer')} />
			</FormControl>
		</Form>
	);
};
