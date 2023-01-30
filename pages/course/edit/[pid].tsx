import { MainLayout } from '@/components/Layout';
import colors from '@/constant/colors';
import { Button, FormControl, FormLabel, IconButton, Input, Select } from '@chakra-ui/react';
import { AddCourseContainer, EditableCustom, TabsCustom } from '@/features/course/components/index.styled';
import {
	EditableInput,
	EditablePreview,
	Flex,
	Text,
	Heading,
	Tab,
	TabList,
	TabPanel,
	TabPanels,
} from '@chakra-ui/react';
import { useQuill } from 'react-quilljs';
import 'quill/dist/quill.snow.css';
import React, { useContext, useReducer, useState } from 'react';
import { AddIcon } from '@chakra-ui/icons';
import { AddFAQ } from '@/features/course/components/AddFAQ';
import { FAQ } from '@/features/course/types';
import { CATEGORIES } from '@/data/categories';
import { Context } from '@/store/appContext';
import { reducer } from '@/store/course';
import { FirebaseError } from 'firebase/app';
import { firebaseErrors } from '@/data/firebaseErrors';
import { toast } from 'react-toastify';
import { useRouter } from 'next/router';
import { GetServerSideProps, NextPage } from 'next';
import { firestoredb } from '@/lib/firebase';
import { CourseType } from '@/features/courses/types';
import { doc, getDoc } from 'firebase/firestore';
import { editCourse } from '@/features/course/api/editCourse';
import { withProtected } from '@/hook/route';

type Props = {
	currentCourse: CourseType;
};

const EditCourse: NextPage<Props> = ({ currentCourse }) => {
	const initialState = {
		description: currentCourse.description,
		category: currentCourse.category,
		title: currentCourse.link_name,
		imageUrl: currentCourse.image_url,
		price: currentCourse.retail_price,
		lectures: currentCourse.lectures,
		duration: currentCourse['length(minutes)'],
		level: currentCourse.level,
	};

	const [state, dispatch] = useReducer(reducer, initialState);
	const [isLoading, setLoading] = React.useState(false);
	const { quill, quillRef } = useQuill();
	const [faqInput, setFaqInput] = useState<Array<FAQ>>(currentCourse.faq ? currentCourse.faq : []);
	const { currentUser } = useContext(Context);
	const router = useRouter();

	React.useEffect(() => {
		if (quill) {
			quill.clipboard.dangerouslyPasteHTML(state.description);
			quill.on('text-change', () => {
				dispatch({
					type: 'description',
					payload: quill.root.innerHTML,
				});
			});
		}
	}, [quill]);

	function removeFAQForm(index: number) {
		const currentFAQ = [...faqInput];
		const filteredFAQArray = currentFAQ.filter((faq, i) => i !== index);
		setFaqInput(filteredFAQArray);
	}

	function addNewFAQForm() {
		const currentFAQ = [...faqInput];
		currentFAQ.push({
			question: '',
			answer: '',
		});
		setFaqInput(currentFAQ);
	}

	function handleFAQInputChange(index: number, key: 'question' | 'answer', value: string) {
		const currentFAQ = [...faqInput];
		const currentValue: FAQ = currentFAQ[index];
		currentValue[key] = value;
		currentFAQ[index] = currentValue;
		setFaqInput(currentFAQ);
	}

	async function onSubmit() {
		setLoading(true);

		try {
			const id = currentCourse.id;
			const { category, title, imageUrl, duration, lectures, description, price } = state;
			const data = {
				...currentCourse,
				category: category,
				image_url: imageUrl,
				link_id: id.toString(),
				link_name: title,
				retail_price: price,
				tutor: currentUser.name,
				description,
				'length(minutes)': duration,
				lectures,
				faq: faqInput,
			};
			await editCourse(data, id);
			setLoading(false);
			router.back();
			toast.success('Courses edited');
		} catch (error) {
			setLoading(false);
			let errorMessage = '';
			const errorObject = error as FirebaseError;
			if (errorObject.name === 'FirebaseError') {
				errorMessage = firebaseErrors[errorObject.code];
			} else {
				errorMessage = errorObject.message;
			}
			toast.error(errorMessage);
		}
	}

	return (
		<MainLayout title="Edit course">
			<AddCourseContainer>
				<Flex gridColumnStart={1} gridColumnEnd={-1}>
					<Heading as="h2" size="3xl" color="primaryDark" my="2rem" px="2.5">
						Edit Course
					</Heading>
				</Flex>

				<EditableCustom
					textAlign="left"
					fontSize="4xl"
					className="header-edit"
					borderStyle="dotted"
					borderWidth="1px"
					borderColor="black"
					placeholder="Enter course title"
					value={state.title}
					textTransform="capitalize"
					onChange={(e) =>
						dispatch({
							type: 'title',
							payload: e,
						})
					}
				>
					<EditablePreview />
					<EditableInput />
				</EditableCustom>
				<TabsCustom isFitted variant="enclosed" className="tabs">
					<TabList mb="1em">
						<Tab _selected={{ color: 'white', bg: colors.primaryColorDark }} bg="#919497">
							Description
						</Tab>
						<Tab _selected={{ color: 'white', bg: colors.primaryColorDark }} bg="#919497">
							FAQ
						</Tab>
					</TabList>
					<TabPanels style={{ width: '100%', height: '50vh' }}>
						<TabPanel style={{ width: '100%', height: '100%' }}>
							<div style={{ width: '100%', height: '100%' }}>
								<div ref={quillRef} />
							</div>
						</TabPanel>
						<TabPanel>
							<Flex borderRadius="md" bg="gray.200" color="white" alignItems="center">
								<IconButton
									colorScheme="blue"
									aria-label="Search database"
									onClick={addNewFAQForm}
									icon={<AddIcon />}
									m="10px"
								/>
								<Text fontSize="1rem" color="black">
									Add FAQ
								</Text>
							</Flex>
							{faqInput.map((faq, index) => (
								<AddFAQ
									key={index}
									removeFAQForm={removeFAQForm}
									index={index}
									value={faqInput[index]}
									handleFAQInputChange={handleFAQInputChange}
								/>
							))}
						</TabPanel>
					</TabPanels>
				</TabsCustom>
				<Flex className="others" direction="column" p="1rem">
					<FormControl isRequired>
						<FormLabel>Duration(in minutes)</FormLabel>
						<Input
							required
							type="number"
							value={state.duration}
							min={60}
							onChange={(e) =>
								dispatch({
									type: 'duration',
									payload: Number(e.target.value),
								})
							}
						/>
					</FormControl>
					<FormControl isRequired>
						<FormLabel>No of Lectures</FormLabel>
						<Input
							type="number"
							value={state.lectures}
							min={40}
							onChange={(e) =>
								dispatch({
									type: 'lectures',
									payload: Number(e.target.value),
								})
							}
						/>
					</FormControl>
					<FormControl isRequired>
						<FormLabel>Image Url</FormLabel>
						<Input
							type="text"
							value={state.imageUrl}
							onChange={(e) =>
								dispatch({
									type: 'imageUrl',
									payload: e.target.value,
								})
							}
						/>
					</FormControl>
					<FormControl isRequired>
						<FormLabel>Price(in dollars)</FormLabel>
						<Input
							type="number"
							value={state.price}
							min={30}
							onChange={(e) =>
								dispatch({
									type: 'price',
									payload: Number(e.target.value),
								})
							}
						/>
					</FormControl>
					<FormControl isRequired>
						<FormLabel>Category</FormLabel>
						<Select
							placeholder="Select Category"
							onChange={(e) =>
								dispatch({
									type: 'category',
									payload: e.target.value,
								})
							}
							value={state.category}
						>
							{CATEGORIES.map((category) => (
								<option key={category.id} value={category.name}>
									{category.name}
								</option>
							))}
						</Select>
					</FormControl>
					<FormControl isRequired>
						<FormLabel>Levels</FormLabel>
						<Select
							placeholder="Select Course Level"
							onChange={(e) =>
								dispatch({
									type: 'level',
									payload: e.target.value,
								})
							}
							value={state.level}
						>
							<option value="beginner">Beginner</option>
							<option value="intermediate">Intermediate</option>
							<option value="expert">Expert</option> <option value="all">All</option>
						</Select>
					</FormControl>
				</Flex>
				<Button isLoading={isLoading} bg={colors.primaryColorDark} size="lg" color="white" onClick={onSubmit}>
					Publish
				</Button>
			</AddCourseContainer>
		</MainLayout>
	);
};

export const getServerSideProps: GetServerSideProps = async (context) => {
	const courseId = context.query.pid as string;
	let currentCourse: CourseType | null = null;
	const docRef = doc(firestoredb, 'courses', courseId);
	const docSnap = await getDoc(docRef);

	if (docSnap.exists()) {
		currentCourse = {
			...docSnap.data(),
			id: docSnap.id,
		} as CourseType;
	} else {
		console.log('No such document!');
	}

	if (!currentCourse) {
		return {
			redirect: {
				destination: '/courses',
				permanent: false,
			},
		};
	}
	return { props: { currentCourse } };
};

export default withProtected(EditCourse);
