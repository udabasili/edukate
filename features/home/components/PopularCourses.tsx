import { Heading, Text } from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import { CategoriesListContainer, Course, Courses } from './index.styled';
import Image from 'next/image';
import { SectionHeader } from '@/components/SectionHeader';
import NextLink from 'next/link';
import { CourseType } from '@/features/courses/types';
import { getAllCourses } from '@/features/courses/api/getAllCourses';

export const PopularCourses = () => {
	const [courses, setCourses] = useState<Array<CourseType>>([]);
	useEffect(() => {
		(async () => {
			const { courses } = await getAllCourses(6);
			setCourses([...courses]);
		})();
	}, []);

	return (
		<CategoriesListContainer>
			<SectionHeader title="Popular Courses" />
			<Courses>
				{courses
					.filter((course, i) => i < 6)
					.map((course, id) => (
						<NextLink href={`/course/${course.id}`} key={course.link_id} passHref>
							<Course key={course.link_id}>
								<div className="image-container">
									<Image
										src={course.image_url as string}
										alt={course.link_name}
										width="150"
										height="150"
										objectFit="cover"
									/>
								</div>
								<Heading as="h5" size="sm">
									{course.link_name}
								</Heading>
								<Text fontSize="sm" as="i">
									{course.advertiser}
								</Text>
								<Text fontSize="sm" as="b">
									${course.retail_price}
								</Text>
							</Course>
						</NextLink>
					))}
			</Courses>
		</CategoriesListContainer>
	);
};
