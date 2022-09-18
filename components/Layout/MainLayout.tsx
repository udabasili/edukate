import React from 'react';
import { Footer } from '../Footer';
import { MainHead } from '../Head';
import { SideNavigation, Navigation } from '../Navigation';
import { Main, MainLayoutContainer } from './index.styled';

type MainLayout = {
	children: React.ReactNode;
	title: string;
	description?: string;
};

export const MainLayout = (props: MainLayout) => {
	const { children, title, description } = props;
	return (
		<MainLayoutContainer>
			<MainHead title={title} description={description} />
			<SideNavigation />
			<Navigation />
			<Main>
				{children}
				<Footer />
			</Main>
		</MainLayoutContainer>
	);
};
