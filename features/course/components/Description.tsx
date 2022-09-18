import React from 'react';
import { DescriptionContainer } from './index.styled';
import DOMPurify from 'isomorphic-dompurify';

type Props = {
	description: string;
};

export const Description = (props: Props) => {
	const { description } = props;
	let clean = DOMPurify.sanitize(description);

	return (
		<DescriptionContainer
			dangerouslySetInnerHTML={{
				__html: clean,
			}}
		></DescriptionContainer>
	);
};
