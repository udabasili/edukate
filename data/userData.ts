import { RegisterFormDTO, LoginFormDTO } from '@/features/auth/types';

export const student: RegisterFormDTO = {
	email: 'student@yahoo.com',
	password: '12345678',
	name: 'John Peter',
	type: 'student',
	imageUrl: 'https://bit.ly/kent-c-dodds',
};

export const teacher: RegisterFormDTO = {
	email: 'teacher@yahoo.com',
	password: '12345678',
	name: 'Mike Parker',
	type: 'teacher',
	imageUrl:
		'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=60&q=80',
};

export const studentLogin: LoginFormDTO = {
	email: 'student@yahoo.com',
	password: '12345678',
};

export const teacherLogin: LoginFormDTO = {
	email: 'teacher@yahoo.com',
	password: '12345678',
};
