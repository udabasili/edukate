import { CourseType } from '@/features/courses/types';
import React from 'react';
import { Aside } from './Aside';
import { CourseBody } from './CourseBody';
import { CourseHeader } from './CourseHeader';

type Props = {
	currentCourse: CourseType;
	coursesIds: Array<string>;
	setCurrentSection: (e: any) => void;
};

export const CourseOverview = (props: Props) => {
	const { currentCourse, coursesIds, setCurrentSection } = props;
	return (
		<>
			<CourseHeader course={currentCourse} />
			<Aside course={currentCourse} coursesIds={coursesIds} setCurrentSection={setCurrentSection} />
			<CourseBody course={currentCourse} />
		</>
	);
};
