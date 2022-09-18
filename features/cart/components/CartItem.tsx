import React, { useCallback, useEffect, useState } from 'react';
import { Img, Text, Grid, Heading, GridItem, Skeleton, SkeletonText } from '@chakra-ui/react';
import { doc, onSnapshot } from 'firebase/firestore';
import { firestoredb } from '@/lib/firebase';
import { CourseType } from '@/features/courses/types';

type Props = {
	courseId: string;
};
export const CartItem = ({ courseId }: Props) => {
	const [course, setCourse] = useState<CourseType | null>(null);
	const [isLoading, setIsLoading] = useState(true);

	useEffect(() => {
		setIsLoading(true);
		const unsubscribe = onSnapshot(doc(firestoredb, 'courses', courseId), (doc) => {
			let courseObject = null;
			if (doc.exists()) {
				courseObject = {
					...(doc.data() as CourseType),
					id: doc.id,
				};
				setCourse(courseObject);
			}
		});
		setIsLoading(false);

		return () => {
			unsubscribe();
		};
	}, []);

	return (
		<Grid templateRows="repeat(3, min-content)" templateColumns="repeat(2, 1fr)" columnGap={2} mb={4}>
			<GridItem rowSpan={3} colSpan={1} position="relative">
				<Skeleton isLoaded={!isLoading} height="100%">
					<Img src={course?.image_url} alt={course?.link_name} />
				</Skeleton>
			</GridItem>
			<GridItem colStart={2} colEnd={3}>
				<SkeletonText isLoaded={!isLoading}>
					<Heading as="h5" size="sm">
						{course?.link_name}
					</Heading>
				</SkeletonText>
			</GridItem>
			<GridItem colStart={2} colEnd={3}>
				<SkeletonText isLoaded={!isLoading}>
					<Text fontSize="md">{course?.tutor}</Text>
				</SkeletonText>
			</GridItem>
			<GridItem>
				<SkeletonText isLoaded={!isLoading}>
					<Text fontSize="lg" as="b">
						${course?.retail_price}
					</Text>
				</SkeletonText>
			</GridItem>
		</Grid>
	);
};
