import React from 'react';
import { HamburgerIcon, AddIcon, ExternalLinkIcon, RepeatIcon, EditIcon } from '@chakra-ui/icons';
import { FormLabel, IconButton, Menu, MenuItem, MenuList, Progress } from '@chakra-ui/react';
import { EnrolledClass } from '../types';
import { ClassItemContainer, CourseProgress, Image, Name, OptionMenu, Tutor } from './index.styled';
import NextLink from 'next/link';

type Props = {
	enrolledClass: EnrolledClass;
};

export const ClassItem = ({ enrolledClass }: Props) => {
	return (
		<NextLink key={enrolledClass.enrolledId} href={`/course/${enrolledClass.courseId}`} passHref>
			<ClassItemContainer w="100%" boxShadow="base" pb={3}>
				<Image src={enrolledClass.image_url} alt={enrolledClass.link_name} />
				<Menu>
					<OptionMenu as={IconButton} aria-label="Options" icon={<HamburgerIcon />} variant="outline" />
					<MenuList>
						<MenuItem icon={<AddIcon />} command="⌘T">
							New Tab
						</MenuItem>
						<MenuItem icon={<ExternalLinkIcon />} command="⌘N">
							New Window
						</MenuItem>
						<MenuItem icon={<RepeatIcon />} command="⌘⇧N">
							Open Closed Tab
						</MenuItem>
						<MenuItem icon={<EditIcon />} command="⌘O">
							Open File...
						</MenuItem>
					</MenuList>
				</Menu>
				<Name as="h5" size="sm">
					{enrolledClass.link_name}
				</Name>
				<Tutor fontSize="md">{enrolledClass.tutor}</Tutor>
				{/* <CourseProgress>
					<Progress value={80} colorScheme="blue" />
					<FormLabel size="sm">80 percent completed</FormLabel>
				</CourseProgress> */}
			</ClassItemContainer>
		</NextLink>
	);
};
