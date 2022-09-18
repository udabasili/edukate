import { Button, Box } from '@chakra-ui/react';
import React, { useState } from 'react';
import { z } from 'zod';
import { Formik } from 'formik';
import { toFormikValidationSchema } from 'zod-formik-adapter';
import { CustomForm, CustomFormControl } from '@/components/Form';
import { FirebaseError } from 'firebase/app';
import { firebaseErrors } from '@/data/firebaseErrors';
import { toast } from 'react-toastify';
import { LoginFormDTO } from '../types';
import { login } from '../api/login';

const VALUES = ['teacher', 'student'] as const;

const schema = z.object({
	password: z.string().min(7),
	email: z.string().email(),
});

type Props = {
	type: 'student' | 'teacher';
	currentUser: LoginFormDTO;
};

export const LoginForm = (props: Props) => {
	const { type, currentUser } = props;
	const [isLoading, setLoading] = useState(false);

	const initial = currentUser;

	return (
		<Box bg="white" p={6} rounded="md" w="100%">
			<Formik
				initialValues={initial}
				enableReinitialize={true}
				validationSchema={toFormikValidationSchema(schema)}
				onSubmit={async (values) => {
					try {
						setLoading(true);
						await login(values);
						toast.success('Successfully Login');
						setLoading(false);
					} catch (error) {
						setLoading(false);

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

						<Button
							type="submit"
							bgColor="secondary"
							color="white"
							width="full"
							disabled={isLoading}
							isLoading={isLoading}
						>
							Click Me
						</Button>
					</CustomForm>
				)}
			</Formik>
		</Box>
	);
};
