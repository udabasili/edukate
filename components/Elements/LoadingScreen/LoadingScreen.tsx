import React from 'react';

import { Container } from './index.styled';

export const LoadingScreen = () => {
	return (
		<Container data-cy="loading">
			<div className="loading" />
		</Container>
	);
};
