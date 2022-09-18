import { Fuego } from 'swr-firestore-v9';
import { getApps, initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getDatabase } from 'firebase/database';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
	apiKey: 'AIzaSyCY0w0oB0xHsjtS_NQuXSaCNiWqpEbOFow',
	authDomain: 'edukate-7c323.firebaseapp.com',
	projectId: 'edukate-7c323',
	storageBucket: 'edukate-7c323.appspot.com',
	messagingSenderId: '865167141804',
	databaseURL: 'https://edukate-7c323-default-rtdb.europe-west1.firebasedatabase.app/',
	appId: '1:865167141804:web:2de895ce351501b0276809',
};

if (!getApps().length) initializeApp(firebaseConfig);

export const auth = getAuth();

export const database = getDatabase();

export const firestoredb = getFirestore();

export const fuego = new Fuego(firebaseConfig);
