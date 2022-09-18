import { getUser } from '@/features/auth/api/getUser';
import { UserResponse } from '@/features/auth/types';
import { auth, database } from '@/lib/firebase';
import { Context } from '@/store/appContext';
import { User } from 'firebase/auth';
import { child, get, ref } from 'firebase/database';
import { useState, useEffect, useContext } from 'react';

export type UserProps = {
	uid: string;
	displayName: string;
	email: string;
};
