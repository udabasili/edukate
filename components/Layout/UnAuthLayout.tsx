import * as React from 'react';
import { Footer } from '../Footer';
import { MainHead } from '../Head';
import { SideNavigation, Navigation } from '../Navigation';
import { Main, MainLayoutContainer } from './index.styled';

type ContentLayoutProps = {
	children: React.ReactNode;
	title: string;
	description?: string;
};

export const UnAuthLayout = ({ children, title, description }: ContentLayoutProps) => {
	return (
		<MainLayoutContainer>
			<MainHead title={title} description={description} />
			<Main>
				{children}
				<Footer />
			</Main>
		</MainLayoutContainer>
	);
};
