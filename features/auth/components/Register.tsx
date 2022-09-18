import { student, teacher } from '@/data/userData';
import { Tabs, TabList, Tab, TabPanels, TabPanel } from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import { RegisterFormDTO } from '../types';
import { RegisterContainer } from './index.styled';
import { RegisterForm } from './RegisterForm';

type Interface = {
	[index: string]: RegisterFormDTO;
};

export const Register = () => {
	const [currentTab, setCurrentTab] = React.useState<'teacher' | 'student'>('student');
	const [currentData, setCurrentData] = useState(student);

	useEffect(() => {
		if (currentTab === 'student') setCurrentData(student);
		if (currentTab === 'teacher') setCurrentData(teacher);
	}, [currentTab]);

	function onChangeHandler(index: number) {
		if (index === 0) setCurrentTab('student');
		if (index === 1) setCurrentTab('teacher');
	}

	return (
		<RegisterContainer>
			<Tabs isFitted variant="enclosed" onChange={(index) => onChangeHandler(index)} defaultIndex={0}>
				<TabList mb="1em">
					<Tab _selected={{ color: 'white', bg: 'black' }}>Student</Tab>
					<Tab _selected={{ color: 'white', bg: 'black' }}>Teacher</Tab>
				</TabList>
				<TabPanels>
					<TabPanel>
						<RegisterForm type="student" currentUser={currentData} />
					</TabPanel>
					<TabPanel>
						<RegisterForm type="teacher" currentUser={currentData} />
					</TabPanel>
				</TabPanels>
			</Tabs>
		</RegisterContainer>
	);
};
