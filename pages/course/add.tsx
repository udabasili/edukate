import { MainLayout } from '@/components/Layout';
import colors from '@/constant/colors';
import { Button, FormControl, FormLabel, IconButton, Input, Select } from '@chakra-ui/react';
import { AddCourseContainer, EditableCustom, TabsCustom } from '@/features/course/components/index.styled';
import {
	Box,
	Editable,
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
import React, { ChangeEvent, useContext, useReducer, useState } from 'react';
import { AddIcon } from '@chakra-ui/icons';
import { AddFAQ } from '@/features/course/components/AddFAQ';
import { FAQ } from '@/features/course/types';
import { CATEGORIES } from '@/data/categories';
import { Context } from '@/store/appContext';
import { reducer, initialState } from '@/store/course';
import { addCourse } from '@/features/course/api/addCourse';
import { FirebaseError } from 'firebase/app';
import { firebaseErrors } from '@/data/firebaseErrors';
import { toast } from 'react-toastify';
import { useRouter } from 'next/router';
import { withAuthUser, AuthAction } from 'next-firebase-auth';
import { withProtected } from '@/hook/route';

const MIN = 10000;
const MAX = 90000;

const AddCorse = () => {
	const [state, dispatch] = useReducer(reducer, initialState);
	const [isLoading, setLoading] = React.useState(false);
	const { quill, quillRef } = useQuill();
	const [faqInput, setFaqInput] = useState<Array<FAQ>>([]);
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
			const id = Math.floor(Math.random() * MAX) + MIN;
			const { category, title, imageUrl, duration, lectures, description, price } = state;
			const data = {
				advertiser: 'Udemy',
				category: category,
				image_url: imageUrl,
				link: 'https://click.linksynergy.com/link?id=2mhs2G02AJA&offerid=358574.563066&type=2&murl=https%3A%2F%2Fwww.udemy.com%2Fshell-scripting-linux%2F',
				link_code:
					'<a href="https://click.linksynergy.com/link?id=2mhs2G02AJA&offerid=358574.563066&type=2&murl=https%3A%2F%2Fwww.udemy.com%2Fshell-scripting-linux%2F"><IMG border=0 src="https://udemy-images.udemy.com/course/480x270/563066_4981_2.jpg" ></a><IMG border=0 width=1 height=1 src="https://ad.linksynergy.com/fs-bin/show?id=2mhs2G02AJA&bids=358574.563066&type=2&subid=0" >',
				link_id: id.toString().substring(0, 7),
				link_name: title,
				pixel_url: 'https://ad.linksynergy.com/fs-bin/show?id=2mhs2G02AJA&bids=358574.563066&type=2&subid=0',
				retail_price: price,
				tutor: currentUser.name,
				level: 'intermediate',
				description,
				'length(minutes)': duration,
				lectures,
				faq: faqInput,
			};
			const newCoursesId = await addCourse(data);
			setLoading(false);
			router.push(`/course/${newCoursesId}`);
			toast.success('Courses added');
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
		<MainLayout title="Add course">
			<AddCourseContainer>
				<Flex gridColumnStart={1} gridColumnEnd={-1}>
					<Heading as="h2" size="3xl" color="primaryDark" my="2rem" px="2.5">
						Add Course
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

export default withProtected(AddCorse);
