import { CourseType } from '@/features/courses/types';

export type Enrollment = {
	id: string;
	courseId: string;
	studentId: string;
	enrollment: Date;
};

export type EnrollmentDTO = Omit<Enrollment, 'id'>;

export type EnrolledClass = {
	enrolledId: string;
	courseId: string;
} & CourseType;
