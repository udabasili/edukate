import { UserResponse } from '@/features/auth/types';
import { FormControl, FormControlProps, FormErrorMessage, FormLabel, Input } from '@chakra-ui/react';
import { Field } from 'formik';
import React from 'react';

type Error = {
	[index: string]: string | boolean;
};

type Touched = {
	[index: string]: boolean;
};

type Props<SchemeType> = {
	label: string;
	name: string;
	type: number | 'text' | 'email' | 'password' | string;
	errors: Error;
	touched: Touched;
} & FormControlProps;

export const CustomFormControl = <SchemeType extends Partial<UserResponse>>(props: Props<SchemeType>) => {
	const { label, type, name, errors, touched } = props;

	return (
		<FormControl isInvalid={!!errors[name] && touched[name]}>
			<FormLabel htmlFor={name}>{label}</FormLabel>
			<Field as={Input} id={name} name={name} type={type} variant="filled" readOnly />
			{errors ? <FormErrorMessage>{errors[name]}</FormErrorMessage> : null}
		</FormControl>
	);
};
