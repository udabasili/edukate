import React from 'react';
import Head from 'next/head';

type MainHead = {
	title: string;
	description?: string;
};
export const MainHead = (props: MainHead) => {
	const { title = '', description = 'Education App' } = props;
	return (
		<Head>
			<title>{`${title} - Edukator`}</title>
			<meta name="description" content={description} />
		</Head>
	);
};
