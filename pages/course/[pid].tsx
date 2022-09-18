import React, { useContext, useEffect, useState } from 'react';
import { MainLayout } from '@/components/Layout';
import { CourseType } from '@/features/courses/types';
import { CourseContainer } from '@/features/course/components/index.styled';
import { Course, CourseOverview } from '@/features/course';
import { getCurrentUserClasses } from '@/features/my-classes/api/getCurrentUserClasses';
import { Context } from '@/store/appContext';
import { useRouter } from 'next/router';
import { getCourseById } from '@/features/course/api/getCourseByid';
import { LoadingScreen } from '@/components/Elements';
import { withProtected } from '@/hook/route';

type Props = {
	currentCourse: CourseType;
	setCurrentSection: (e: any) => void;
	coursesIds: Array<string>;
};

type ComponentProps = {
	[index: string]: React.FC<Props>;
};

const components: ComponentProps = {
	overview: CourseOverview,
	course: Course,
} as const;

const CoursePage = () => {
	const [currentSection, setCurrentSection] = useState<keyof typeof components>('overview');
	const [coursesIds, setCourseIds] = useState<string[]>([]);
	const [currentCourse, setCurrentCourse] = useState<CourseType | null>(null);
	const [isLoading, setLoading] = useState(false);

	const { currentUser } = useContext(Context);
	const router = useRouter();
	const { pid } = router.query;

	useEffect(() => {
		(async () => {
			setLoading(true);

			try {
				const currentCourse = await getCourseById(pid as string);
				const coursesIds = await getCurrentUserClasses(currentUser.userId);
				setCourseIds(coursesIds);
				setCurrentCourse(currentCourse);
				setLoading(false);
			} catch (error) {
				console.error(error);
				setLoading(false);
			}
		})();
	}, []);

	const Component = components[currentSection];

	return isLoading ? (
		<LoadingScreen />
	) : (
		<MainLayout title={currentCourse?.link_name || 'Course'}>
			<CourseContainer>
				{currentCourse ? (
					<Component
						currentCourse={currentCourse}
						setCurrentSection={setCurrentSection}
						coursesIds={coursesIds}
					/>
				) : null}
			</CourseContainer>
		</MainLayout>
	);
};

export default withProtected(CoursePage);
