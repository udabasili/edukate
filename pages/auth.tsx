import { UnAuthLayout } from '@/components/Layout';
import { AuthContainer, Login } from '@/features/auth';
import { withPublic } from '@/hook/route';
import { Box } from '@chakra-ui/react';
import React from 'react';

function AuthPage() {
	return (
		<UnAuthLayout title="Auth">
			<AuthContainer>
				<Box bg="primaryDark" color="white" className="side"></Box>
				<Login />
			</AuthContainer>
		</UnAuthLayout>
	);
}

export default withPublic(AuthPage);
