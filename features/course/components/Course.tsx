import React, { useEffect, useMemo, useState } from 'react';
import { BiArrowBack } from 'react-icons/bi';
import {
	AsideContainer,
	MainContent,
	BackButton,
	DescriptionContainer,
	AsideMobile,
	CourseContainer,
} from './index.styled';
import { CourseType } from '@/features/courses/types';
import {
	Tabs,
	TabList,
	TabPanels,
	Tab,
	TabPanel,
	Heading,
	ListIcon,
	ListItem,
	Accordion,
	AccordionButton,
	AccordionIcon,
	AccordionItem,
	Grid,
	GridItem,
	AccordionPanel,
	Box,
	List,
	Text,
	Progress,
	Spinner,
	IconButton,
} from '@chakra-ui/react';
import { AiFillPlayCircle } from 'react-icons/ai';

type Props = {
	currentCourse: CourseType;
};
import ReactPlayer from 'react-player';
import { HamburgerIcon } from '@chakra-ui/icons';
import { CustomDrawer } from '@/components/Elements';
import { useDisclosure } from '@/hook/useDisclosure';
import { useRouter } from 'next/router';

type AsideComponentProps = {
	currentCourse: CourseType;
	courseProgressPercentage: number;
	countCheckedSubSection: (e: number) => number;
	sectionLength: number;
	selectedSubSection: number | null;
	setSelectedSubSectionHandler: (sectionIndex: number, subSectionIndex: number) => void;
	subSectionIndexCalc: (sectionIndex: number, subSectionIndex: number) => number;
	subSectionChecked: (sectionIndex: number, subSectionIndex: number) => boolean;
	toggleChecked: (sectionIndex: number, subSectionIndex: number) => void;
};

const AsideComponent = ({
	setSelectedSubSectionHandler,
	currentCourse,
	selectedSubSection,
	subSectionChecked,
	courseProgressPercentage,
	countCheckedSubSection,
	toggleChecked,
	sectionLength,
	subSectionIndexCalc,
}: AsideComponentProps) => {
	const router = useRouter();
	return (
		<>
			<BackButton cursor="pointer">
				<BiArrowBack onClick={() => router.back()} />
				back
			</BackButton>
			<Heading as="h4" size="md" className="feature-heading" mb={2} mt={4}>
				{currentCourse.link_name}
			</Heading>
			<Tabs isFitted variant="enclosed">
				<TabList>
					<Tab>Overview</Tab>
					<Tab>Description</Tab>
				</TabList>

				<TabPanels>
					<TabPanel overflowY="auto">
						<Progress value={courseProgressPercentage} my="2rem" />
						<Accordion allowToggle>
							{[...new Array(sectionLength)].map((item, sectionIndex) => (
								<AccordionItem key={sectionIndex}>
									<h2>
										<AccordionButton _expanded={{ bg: 'black', color: 'white' }}>
											<Box flex="1" textAlign="left">
												<Grid templateRows="min-content max-content" columnGap={4}>
													<GridItem rowStart={1} rowEnd={2}>
														<Heading as="h5" size="sm">
															Section {sectionIndex + 1}: App
														</Heading>
													</GridItem>
													<GridItem rowStart={2} rowEnd={3}>
														{countCheckedSubSection(sectionIndex)} / 4
													</GridItem>
												</Grid>
											</Box>
											<AccordionIcon />
										</AccordionButton>
									</h2>
									<AccordionPanel>
										<List spacing={3}>
											{[...new Array(4)].map((item, subSectionIndex) => (
												<ListItem
													key={subSectionIndexCalc(sectionIndex, subSectionIndex)}
													fontSize="1rem"
													cursor="pointer"
													p={2}
													bgColor={
														subSectionIndexCalc(sectionIndex, subSectionIndex) ===
														selectedSubSection
															? 'gray.300'
															: 'transparent'
													}
													onClick={() =>
														setSelectedSubSectionHandler(sectionIndex, subSectionIndex)
													}
												>
													<Grid templateColumns="min-content max-content" columnGap={4}>
														<GridItem
															rowSpan={2}
															colStart={1}
															colEnd={2}
															justifySelf="flex-start"
														>
															<input
																type="checkbox"
																checked={subSectionChecked(
																	sectionIndex,
																	subSectionIndex
																)}
																onChange={() =>
																	toggleChecked(sectionIndex, subSectionIndex)
																}
															/>
														</GridItem>
														<GridItem colStart={2} colEnd={3}>
															Lesson No {4 * sectionIndex + subSectionIndex}
														</GridItem>
														<GridItem colStart={2} colEnd={3}>
															{' '}
															<ListIcon as={AiFillPlayCircle} />
															{currentCourse['length(minutes)']} minutes
														</GridItem>
													</Grid>
												</ListItem>
											))}
										</List>
									</AccordionPanel>
								</AccordionItem>
							))}
						</Accordion>
					</TabPanel>
					<TabPanel>
						<DescriptionContainer>
							<b />
							<Text fontSize="1rem">
								Based on feedback from over 25,000 5-star reviews, I’ve created The Complete Web
								Developer Course 2.0, the sequel to my global smash-hit: Build 14 Websites course.
							</Text>
							<Text as="i" fontSize="1rem">
								It’s my most current, in-depth and exciting coding course—to date.
							</Text>
							<Text fontSize="1rem">
								Designed for you—no matter where you are in your coding journey—my next-generation web
								developer course is overflowing with fresh content. Jam-packed with high-quality
								tutorials. And crucially, features the most advanced, hot-off-the-press software
								versions.
							</Text>
							<Text as="i" fontSize="1rem">
								It’s my most current, in-depth and exciting coding course—to date.
							</Text>
							<Heading as="h4" size="md">
								We’ve left no stone unturned.
							</Heading>
							<Text fontSize="1rem">
								Designed for you—no matter where you are in your coding journey—my next-generation web
								developer course is overflowing with fresh content. Jam-packed with high-quality
								tutorials. And crucially, features the most advanced, hot-off-the-press software
								versions.
							</Text>
						</DescriptionContainer>
					</TabPanel>
				</TabPanels>
			</Tabs>
		</>
	);
};

export const Course = (props: Props) => {
	const { currentCourse } = props;
	const { onOpen, onClose, isOpen } = useDisclosure();

	const sectionLength = Math.floor(currentCourse.lectures / 3);
	const [videoLoading, setVideoLoading] = useState(false);
	const [courseProgressPercentage, setCourseProgressPercentage] = useState(0);
	const [checked, setChecked] = useState<
		Array<{
			section: number;
			subSection: number;
		}>
	>([]);

	const [selectedSubSection, setSelectedSubSection] = useState<number | null>(null);

	useEffect(() => {
		progressCalculator();
	}, [checked]);

	function countCheckedSubSection(section: number) {
		const findChecked = checked.filter((item) => item.section === section);
		const count = findChecked.length;
		return count === 0 ? 0 : count;
	}

	async function setSelectedSubSectionHandler(section: number, subSection: number) {
		setVideoLoading(true);
		function timeout() {
			return new Promise((res) => setTimeout(res, 1));
		}

		await timeout();
		const index = 4 * section + subSection;
		setSelectedSubSection(index);
		setVideoLoading(false);
	}

	function subSectionIndexCalc(section: number, subSection: number) {
		const index = 4 * section + subSection;
		return index;
	}

	function progressCalculator() {
		const checkedArrayPercentage = (checked.length / currentCourse.lectures) * 100;
		setCourseProgressPercentage(checkedArrayPercentage);
	}

	function toggleChecked(section: number, subSection: number) {
		let currentCheckedSate = [...checked];
		const findChecked = currentCheckedSate.find(
			(item) => item.section === section && item.subSection === subSection
		);
		if (findChecked) {
			currentCheckedSate = currentCheckedSate.filter((item) => {
				if (item.section === section && item.subSection === subSection) {
					return false;
				}
				return true;
			});
		} else {
			currentCheckedSate.push({
				section,
				subSection,
			});
		}

		setChecked(currentCheckedSate);
	}

	function subSectionChecked(section: number, subSection: number): boolean {
		let currentCheckedSate = [...checked];
		const findChecked = currentCheckedSate.find(
			(item) => item.section === section && item.subSection === subSection
		);
		return findChecked ? true : false;
	}

	return (
		<CourseContainer className="course">
			<AsideContainer className="course">
				<AsideComponent
					currentCourse={currentCourse}
					courseProgressPercentage={courseProgressPercentage}
					countCheckedSubSection={countCheckedSubSection}
					sectionLength={sectionLength}
					selectedSubSection={selectedSubSection}
					setSelectedSubSectionHandler={setSelectedSubSectionHandler}
					subSectionIndexCalc={subSectionIndexCalc}
					subSectionChecked={subSectionChecked}
					toggleChecked={toggleChecked}
				/>
			</AsideContainer>
			<AsideMobile>
				<IconButton
					bgColor="primary"
					aria-label="Aside Modal"
					size="md"
					icon={<HamburgerIcon />}
					margin="3"
					onClick={onOpen}
				/>
			</AsideMobile>
			<CustomDrawer
				isOpen={isOpen}
				Footer={<></>}
				onClose={onClose}
				title={''}
				onSubmit={function (): void {
					throw new Error('Function not implemented.');
				}}
			>
				<AsideComponent
					currentCourse={currentCourse}
					courseProgressPercentage={courseProgressPercentage}
					countCheckedSubSection={countCheckedSubSection}
					sectionLength={sectionLength}
					selectedSubSection={selectedSubSection}
					setSelectedSubSectionHandler={setSelectedSubSectionHandler}
					subSectionIndexCalc={subSectionIndexCalc}
					subSectionChecked={subSectionChecked}
					toggleChecked={toggleChecked}
				/>
			</CustomDrawer>
			<MainContent>
				{videoLoading ? (
					<Spinner className="spinner" />
				) : (
					<ReactPlayer
						className="react-player"
						url="https://www.youtube.com/watch?v=ysz5S6PUM-U"
						width="100%"
						height="100%"
						controls={true}
					/>
				)}
			</MainContent>
		</CourseContainer>
	);
};
