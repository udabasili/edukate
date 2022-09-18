import {
	Menu,
	MenuButton,
	Button,
	MenuList,
	MenuItem,
	Avatar,
	Image,
	Heading,
	AvatarGroup,
	IconButton,
	List,
	ListItem,
} from '@chakra-ui/react';
import { BiLogOut, BiSearchAlt2 } from 'react-icons/bi';
import React, { useCallback, useContext, useEffect, useState } from 'react';
import { CustomDrawer, SearchBox } from '../Elements';
import NextLink from 'next/link';
import { Nav } from './Navigation.styled';
import { AddIcon, ChevronDownIcon } from '@chakra-ui/icons';
import { AiOutlineUser } from 'react-icons/ai';
import { useDisclosure } from '@/hook/useDisclosure';
import { CATEGORIES } from '@/data/categories';
import { isBrowser } from 'react-device-detect';
import { size } from '@/utils/responsive';
import { SearchWindow } from '../SearchWindow';
import { CourseType } from '@/features/courses/types';
import { signOut } from 'firebase/auth';
import { auth, firestoredb } from '@/lib/firebase';
import { toast } from 'react-toastify';
import { Context } from '@/store/appContext';
import { UserResponse } from '@/features/auth/types';
import { collection, onSnapshot } from 'firebase/firestore';

type UserDropDownProps = {
	currentUser: UserResponse;
};

export const UserDropDown = ({ currentUser }: UserDropDownProps) => {
	function logout() {
		signOut(auth)
			.then(() => {
				toast.success('Logout successfully');
			})
			.catch((error) => {
				// An error happened.
			});
	}
	return (
		<Menu isLazy>
			<MenuButton
				as={IconButton}
				bg="secondary"
				aria-label="Options"
				borderRadius="50%"
				icon={<AiOutlineUser fontSize="1.5rem" color="white" />}
				variant="outline"
			/>
			<MenuList fontSize="1rem">
				<MenuItem>Hi, {currentUser.name}</MenuItem>

				<MenuItem icon={<AddIcon />}>Profile</MenuItem>
				<MenuItem icon={<BiLogOut />} onClick={logout}>
					Logout
				</MenuItem>
			</MenuList>
		</Menu>
	);
};
export const CategoriesDropDown = () => {
	return (
		<Menu isLazy>
			<MenuButton mr={4} as={Button} bg="primaryDark" color="white" rightIcon={<ChevronDownIcon />}>
				Categories
			</MenuButton>
			<MenuList fontSize="1rem">
				{CATEGORIES.map((category) => (
					<NextLink href={`/categories/${category.name.toLowerCase()}`} passHref key={category.id}>
						<MenuItem>{category.name}</MenuItem>
					</NextLink>
				))}
			</MenuList>
		</Menu>
	);
};

export const Navigation = () => {
	const { onOpen, onClose, isOpen } = useDisclosure();
	const [browserSize, setIsBrowser] = useState(isBrowser);
	const [openSearchWindow, setOpenSearchWindow] = useState(false);
	const [searchWord, setSearchWord] = useState('');
	const [searchItems, setSearchItems] = useState<Array<CourseType>>([]);
	const [currentCourses, setCurrentCourses] = useState<Array<CourseType>>([]);
	const { currentUser } = useContext(Context);

	useEffect(() => {
		const courses: Array<CourseType> = [];
		const coursesRef = collection(firestoredb, 'courses');
		const unsubscribe = onSnapshot(coursesRef, (querySnapshot) => {
			querySnapshot.forEach((doc) => {
				courses.push({
					...(doc.data() as CourseType),
					id: doc.id,
				});
			});
			setCurrentCourses([...courses]);
		});

		return () => {
			unsubscribe();
		};
	}, []);

	useEffect(() => {
		if (searchWord) {
			const filteredCourses = currentCourses.filter((course) => {
				if (course.link_name.toLowerCase().includes(searchWord.toLowerCase())) {
					return true;
				}
				return false;
			});
			setSearchItems(filteredCourses);
		} else {
			setSearchItems([]);
		}
	}, [currentCourses, searchWord]);

	const onCloseSearchWindow = useCallback(() => setOpenSearchWindow(false), []);
	const onOpenSearchWindow = useCallback(() => setOpenSearchWindow(true), []);

	const setIsBrowserHandler = (ev: UIEvent) => {
		setIsBrowser(window.innerWidth > Number(size.tabletPort.replace('px', '')));
	};

	useEffect(() => {
		window.addEventListener('resize', setIsBrowserHandler);

		return () => {
			window.removeEventListener('resize', setIsBrowserHandler);
		};
	}, []);

	return (
		<Nav>
			<NextLink href={`/`} passHref>
				<div className="app-icon">
					<Image boxSize="50%" objectFit="contain" src="/logo.png" alt="Dan Abramov" />
					<Heading fontSize="xl" as="b" textTransform="uppercase" fontFamily="Work Sans" color="primaryDark">
						Edukator
					</Heading>
				</div>
			</NextLink>

			{browserSize ? CategoriesDropDown() : null}
			<SearchBox onClick={onOpenSearchWindow} />
			<AvatarGroup spacing="1rem" className="user-nav">
				<Avatar
					bg="black"
					icon={<BiSearchAlt2 fontSize="1.5rem" color="white" />}
					onClick={onOpen}
					cursor="pointer"
					className="search"
				/>
				{currentUser.type === 'teacher' ? (
					<NextLink href="/course/add" passHref>
						<Button bg="primaryDark" color="white" mr={3}>
							Add Course
						</Button>
					</NextLink>
				) : (
					<NextLink href="/my-classes" passHref>
						<Button bg="primaryDark" color="white" mr={3}>
							My Classes
						</Button>
					</NextLink>
				)}

				{UserDropDown({ currentUser })}
				<CustomDrawer isOpen={isOpen} onClose={onClose} title="Search" onSubmit={function (): void {}}>
					<>
						<SearchBox mb={4} value={searchWord} onChange={(e) => setSearchWord(e.target.value)} />
						{searchItems ? (
							<List spacing={3}>
								{searchItems.map((course, index) => (
									<NextLink href={`/course/${course.id}`} id={course.id} key={course.id} passHref>
										<ListItem
											cursor="pointer"
											_hover={{
												bgColor: 'gray.200',
											}}
											p={1}
										>
											{course.link_name}
										</ListItem>
									</NextLink>
								))}
							</List>
						) : null}
					</>
				</CustomDrawer>
			</AvatarGroup>
			<SearchWindow isOpen={openSearchWindow} onClose={onCloseSearchWindow} title="">
				<>
					<SearchBox mb={4} value={searchWord} onChange={(e) => setSearchWord(e.target.value)} />
					{searchItems ? (
						<List spacing={3}>
							{searchItems.map((course, index) => (
								<NextLink href={`/course/${course.id}`} key={course.id} passHref>
									<ListItem
										cursor="pointer"
										_hover={{
											bgColor: 'gray.200',
										}}
										p={1}
									>
										{course.link_name}
									</ListItem>
								</NextLink>
							))}
						</List>
					) : null}
				</>
			</SearchWindow>
		</Nav>
	);
};
