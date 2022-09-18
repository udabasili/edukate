import React from 'react';
import { Spinner } from '../Spinner';
import Lottie from 'react-lottie';
import { LottieCustom } from './index.styled';
import animationData from '@/data/lottie.json';

const defaultOptions = {
	loop: true,
	autoplay: true,
	animationData: animationData,
	rendererSettings: {
		preserveAspectRatio: 'xMidYMid slice',
	},
};

export const LoadingScreen = () => {
	return (
		<LottieCustom>
			<Lottie options={defaultOptions} height={400} width={400} />
		</LottieCustom>
	);
};
