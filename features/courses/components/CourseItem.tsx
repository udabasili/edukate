import React from 'react';
import { Course, CourseListContainer } from './index.styled';
import Image from 'next/image';
import { Heading, Text } from '@chakra-ui/react';
import { Rating } from '@/components/Elements/Rating';
import { CourseType } from '../types';
import { Spinner } from '@/components/Elements';
import NextLink from 'next/link';
import InfiniteScroll from 'react-infinite-scroll-component';
import DOMPurify from 'isomorphic-dompurify';

type Props = {
	course: CourseType;
};

export const CourseItem = ({ course }: Props) => {
	let clean = DOMPurify.sanitize(course.description.substring(0, 90));

	return (
		<NextLink key={course.link_id} href={`/course/${course.id}`} passHref>
			<Course>
				<div className="image-container">
					<Image
						src={course.image_url as string}
						alt={course.link_name}
						width="150"
						height="150"
						objectFit="cover"
					/>
				</div>
				<div className="description">
					<Heading as="h5" size="xs">
						{course.link_name}
					</Heading>
					<Text fontSize="md">{course.category}</Text>
					<Text
						fontSize="sm"
						mt="1rem"
						dangerouslySetInnerHTML={{
							__html: clean,
						}}
					></Text>
					<Text fontSize="x-small">{course.tutor}</Text>
					<Rating selected={course.rating} />
				</div>
				<div className="price">
					<Text fontSize="sm" as="b">
						${course.retail_price}
					</Text>
				</div>
			</Course>
		</NextLink>
	);
};
