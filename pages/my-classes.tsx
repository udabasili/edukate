import { LoadingScreen } from '@/components/Elements';
import { MainLayout } from '@/components/Layout';
import { ClassList } from '@/features/my-classes';
import { EnrolledClass, Enrollment } from '@/features/my-classes/types';
import { withProtected } from '@/hook/route';
import { firestoredb } from '@/lib/firebase';
import { Context } from '@/store/appContext';
import { Flex, Heading } from '@chakra-ui/react';
import { Unsubscribe } from 'firebase/database';
import { collection, doc, getDoc, getDocs, onSnapshot, query, where } from 'firebase/firestore';
import { withAuthUser, AuthAction } from 'next-firebase-auth';
import React, { useContext, useEffect, useState } from 'react';

const MyClasses = () => {
	const { currentUser, isAuthenticated } = useContext(Context);
	const [enrolledClasses, setEnrolledClass] = useState<EnrolledClass[]>([]);
	const [loading, setLoading] = useState(true);
	let unsubscribe = React.useRef<Unsubscribe>();

	useEffect(() => {
		const q = query(collection(firestoredb, 'enrollment'), where('studentId', '==', currentUser.userId));
		unsubscribe.current = onSnapshot(q, (querySnapshot) => {
			const enrolledClasses: EnrolledClass[] = [];
			querySnapshot.forEach(async (docData) => {
				const enrollmentObject = docData.data() as Enrollment;
				const docRef = doc(firestoredb, 'courses', enrollmentObject.courseId);
				const docSnap = await getDoc(docRef);
				if (docSnap.exists()) {
					const enrolledObject = docSnap.data() as EnrolledClass;

					if (enrolledObject.link_name)
						enrolledClasses.push({
							...enrolledObject,
							enrolledId: docData.id,
							courseId: enrollmentObject.courseId,
						});
				} else {
					console.log('No such document!');
				}
				setEnrolledClass(Array.from(new Set(enrolledClasses)));
			});
			setLoading(false);
		});

		return () => {
			if (unsubscribe.current) {
				unsubscribe.current();
			}
		};
	}, []);

	return loading ? (
		<LoadingScreen />
	) : (
		<MainLayout title="My Classes">
			<Flex gridColumnStart={1} gridColumnEnd={-1}>
				<Heading as="h2" size="3xl" color="primaryDark" my="2rem" px="2.5">
					My Classes
				</Heading>
			</Flex>
			<ClassList enrolledClasses={enrolledClasses} />
		</MainLayout>
	);
};

export default withProtected(MyClasses);
