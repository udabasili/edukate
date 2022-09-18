import { student, teacher, studentLogin, teacherLogin } from '@/data/userData';
import { Tabs, TabList, Tab, TabPanels, TabPanel } from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import { LoginFormDTO } from '../types';
import { RegisterContainer } from './index.styled';
import { LoginForm } from './LoginForm';

type Interface = {
	[index: string]: LoginFormDTO;
};

export const Login = () => {
	const [currentTab, setCurrentTab] = React.useState<'teacher' | 'student'>('student');
	const [currentData, setCurrentData] = useState<LoginFormDTO>(studentLogin);

	function onChangeHandler(index: number) {
		if (index === 0) setCurrentTab('student');
		if (index === 1) setCurrentTab('teacher');
	}

	useEffect(() => {
		if (currentTab === 'student') {
			setCurrentData(studentLogin);
		} else {
			setCurrentData(teacherLogin);
		}
	}, [currentTab]);

	return (
		<RegisterContainer>
			<Tabs isFitted variant="enclosed" onChange={(index) => onChangeHandler(index)} defaultIndex={0}>
				<TabList mb="1em">
					<Tab _selected={{ color: 'white', bg: 'black' }}>Student</Tab>
					<Tab _selected={{ color: 'white', bg: 'black' }}>Teacher</Tab>
				</TabList>
				<TabPanels>
					<TabPanel>
						<LoginForm type="student" currentUser={currentData} />
					</TabPanel>
					<TabPanel>
						<LoginForm type="teacher" currentUser={currentData} />
					</TabPanel>
				</TabPanels>
			</Tabs>
		</RegisterContainer>
	);
};
