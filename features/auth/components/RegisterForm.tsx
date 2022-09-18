import { Button, Box } from '@chakra-ui/react';
import React from 'react';
import { z } from 'zod';
import { Formik } from 'formik';
import { toFormikValidationSchema } from 'zod-formik-adapter';
import { CustomForm, CustomFormControl } from '@/components/Form';
import { registerWithEmailAndPassword } from '../api/register';
import { FirebaseError } from 'firebase/app';
import { firebaseErrors } from '@/data/firebaseErrors';
import { toast } from 'react-toastify';
import { RegisterFormDTO } from '../types';

const schema = z.object({
	name: z.string(),
	password: z.string().min(7),
	email: z.string().email(),
	imageUrl: z.string().url(),
});

type Props = {
	type: 'student' | 'teacher';
	currentUser: RegisterFormDTO;
};

export const RegisterForm = (props: Props) => {
	const { type, currentUser } = props;

	const initial = currentUser;

	return (
		<Box bg="white" p={6} rounded="md" w="100%">
			<Formik
				initialValues={initial}
				enableReinitialize
				validationSchema={toFormikValidationSchema(schema)}
				onSubmit={async (values) => {
					const allValues = {
						...values,
						type,
					};
					try {
						await registerWithEmailAndPassword(allValues);
						toast.success('Successfully Registered');
					} catch (error) {
						let errorMessage = '';
						const errorObject = error as FirebaseError;
						if (errorObject.name === 'FirebaseError') {
							errorMessage = firebaseErrors[errorObject.code];
						} else {
							errorMessage = errorObject.message;
						}
						toast.error(errorMessage);
					}
				}}
			>
				{({ handleSubmit, errors, touched }) => (
					<CustomForm>
						<CustomFormControl
							label={'Name'}
							name={'name'}
							type={'text'}
							errors={errors}
							touched={touched}
						/>
						<CustomFormControl
							label={'Email Address'}
							name={'email'}
							type={'email'}
							errors={errors}
							touched={touched}
						/>
						<CustomFormControl
							label={'Password'}
							name={'password'}
							type={'password'}
							errors={errors}
							touched={touched}
						/>
						<CustomFormControl
							label={'Image Url'}
							name={'imageUrl'}
							type={'string'}
							errors={errors}
							touched={touched}
						/>

						<Button type="submit" bgColor="secondary" color="white" width="full">
							Register
						</Button>
					</CustomForm>
				)}
			</Formik>
		</Box>
	);
};
