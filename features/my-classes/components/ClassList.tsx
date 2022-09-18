import React from 'react';
import { EnrolledClass } from '../types';
import { ClassListContainer } from './index.styled';
import { ClassItem } from './ClassItem';

type Props = {
	enrolledClasses: EnrolledClass[];
};

export const ClassList = (props: Props) => {
	const { enrolledClasses } = props;

	return (
		<ClassListContainer>
			{enrolledClasses.map((enrolledClass, i) => (
				<ClassItem enrolledClass={enrolledClass} key={enrolledClass.enrolledId} />
			))}
		</ClassListContainer>
	);
};
