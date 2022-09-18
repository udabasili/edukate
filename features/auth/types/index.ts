export type UserResponse = {
	userId: string;
	email: string;
	password: string;
	name: string;
	type: 'student' | 'teacher';
	imageUrl: string;
	createdOn: Date;
};

export type RegisterFormDTO = {
	email: string;
	password: string;
	name: string;
	type: 'student' | 'teacher';
	imageUrl: string;
};

export type LoginFormDTO = {
	email: string;
	password: string;
};
export type Teacher = {};
