import type { AppProps } from 'next/app';
import { ChakraProvider } from '@chakra-ui/react';
import theme from '../constant/theme';
import Provider from 'store/appContext';
import 'react-toastify/dist/ReactToastify.css';
import '@fontsource/montserrat/900.css';
import '@fontsource/work-sans/400.css';
import '../styles/globals.css';
import { ToastContainer } from 'react-toastify';
import { FuegoProvider } from 'swr-firestore-v9';
import { fuego } from '@/lib/firebase';
import FirebaseAuthState from '@/features/auth/components/FirebaseAuthState';

function MyApp({ Component, pageProps }: AppProps) {
	return (
		<FuegoProvider fuego={fuego}>
			<Provider>
				<ChakraProvider theme={theme}>
					<FirebaseAuthState>
						<Component {...pageProps} />
						<ToastContainer
							position="top-center"
							autoClose={2000}
							hideProgressBar={false}
							newestOnTop={false}
							closeOnClick
							rtl={false}
							pauseOnFocusLoss
							draggable
							pauseOnHover
						/>
					</FirebaseAuthState>
				</ChakraProvider>
			</Provider>
		</FuegoProvider>
	);
}

export default MyApp;
