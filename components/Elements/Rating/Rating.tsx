import React from 'react';
import { AiFillStar } from 'react-icons/ai';
import { RatingContainer } from './index.styled';

type Props = {
	selected: number;
	total?: number;
};

export const Rating = (props: Props) => {
	const { selected, total = 5 } = props;
	return (
		<RatingContainer>
			{[...Array(total)].map((star, index) => (
				<AiFillStar key={index} className={`star ${selected > index ? 'selected' : null}`} />
			))}
		</RatingContainer>
	);
};
