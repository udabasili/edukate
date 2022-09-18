import { CourseType } from '@/features/courses/types/index';
import { Heading, Text } from '@chakra-ui/react';
import React from 'react';
import { CourseHeaderContainer } from './index.styled';
import DOMPurify from 'isomorphic-dompurify';

type Props = {
	course: CourseType;
};

export const CourseHeader = (props: Props) => {
	const { course } = props;
	let clean = DOMPurify.sanitize(course.description.substring(0, 90));

	return (
		<CourseHeaderContainer>
			<Heading as="h3" size="lg" className="feature-heading" mb={2}>
				{course.link_name}
			</Heading>
			<Text
				className="feature-text"
				fontSize=".95rem"
				dangerouslySetInnerHTML={{
					__html: clean,
				}}
			></Text>
		</CourseHeaderContainer>
	);
};
