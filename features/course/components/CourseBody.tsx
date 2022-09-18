import colors from '@/constant/colors';
import { CourseType } from '@/features/courses/types';
import { Tabs, TabList, Tab, TabPanels, TabPanel } from '@chakra-ui/react';
import React from 'react';
import { Description } from './Description';
import { FAQSection } from './FAQ';
import { CourseBodyContainer, TabsCustom } from './index.styled';
import { Review } from './Review';

type Props = {
	course: CourseType;
};

export const CourseBody = (props: Props) => {
	const { course } = props;
	return (
		<CourseBodyContainer>
			<TabsCustom isFitted variant="enclosed" bgColor="white">
				<TabList mb="1em">
					<Tab _selected={{ color: 'white', bg: colors.primaryColorDark }} bg="#919497">
						Description
					</Tab>
					<Tab _selected={{ color: 'white', bg: colors.primaryColorDark }} bg="#919497">
						FAQ
					</Tab>
					<Tab _selected={{ color: 'white', bg: colors.primaryColorDark }} bg="#919497">
						Reviews
					</Tab>
				</TabList>
				<TabPanels>
					<TabPanel>
						<Description description={course.description} />
					</TabPanel>
					<TabPanel>
						<FAQSection faq={course.faq || []} />
					</TabPanel>
					<TabPanel>
						<Review />
					</TabPanel>
				</TabPanels>
			</TabsCustom>
		</CourseBodyContainer>
	);
};
