import { LoadingScreen } from '@/components/Elements';
import { MainLayout, UnAuthLayout } from '@/components/Layout';
import { AuthContainer, Login, Register } from '@/features/auth';
import { withPublic } from '@/hook/route';
import { Box } from '@chakra-ui/react';
import { AuthAction, withAuthUser } from 'next-firebase-auth';
import React from 'react';

function AuthPage() {
	return (
		<UnAuthLayout title="Auth">
			<AuthContainer>
				<Box bg="primaryDark" color="white" className="side"></Box>
				{/* <Register /> */}
				<Login />
			</AuthContainer>
		</UnAuthLayout>
	);
}

export default withPublic(AuthPage);
