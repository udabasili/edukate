import category from '@/data/categories';
import { UDEMY } from '@/data/udemy';
import { FAQ } from '@/features/course/types';

export type CourseType = {
	id: string;
	faq?: Array<FAQ>;
} & typeof UDEMY[0];

export type CategoryType = typeof category.categoryName[0];
