import colors from '@/constant/colors';
import { CourseType } from '@/features/courses/types';
import { Button, Grid, GridItem, Heading, List, ListIcon, ListItem, Skeleton, Text } from '@chakra-ui/react';
import Image from 'next/image';
import React, { useContext, useState } from 'react';
import { BsCartPlus, BsFillHeartFill } from 'react-icons/bs';
import { HiOutlinePencilAlt } from 'react-icons/hi';
import { AsideContainer, ImageContainer } from './index.styled';
import NextLink from 'next/link';
import { Context } from '@/store/appContext';
import { EditIcon } from '@chakra-ui/icons';
import { BiHeartSquare } from 'react-icons/bi';
import { addItemToCart, CartCredentialsDTO } from '@/features/cart/api/addItemToCart';

type Props = {
	course: CourseType;
	coursesIds: Array<string>;
	setCurrentSection: (e: any) => void;
};

export const Aside = (props: Props) => {
	const { course, coursesIds, setCurrentSection } = props;
	const { currentUser } = useContext(Context);
	const addedToWishList = true;

	const [isImageReady, setIsImageReady] = useState(false);

	const onLoadCallBack = () => {
		setIsImageReady(true);
	};

	return (
		<AsideContainer>
			<ImageContainer>
				<Skeleton isLoaded={isImageReady} width="100%" height="100%">
					<Image
						src={course.image_url as string}
						alt={course.link_name}
						layout="fill"
						objectFit="cover"
						onLoad={onLoadCallBack}
					/>
				</Skeleton>
			</ImageContainer>
			{currentUser.type === 'student' ? (
				coursesIds.includes(course.id) ? (
					<>
						<Text margin="1rem" mx="3rem" fontSize="1rem" as="b">
							You purchased this course already
						</Text>
						<Button
							bg="primaryDark"
							size="lg"
							mx="3rem"
							color="white"
							onClick={() => setCurrentSection('course')}
						>
							Go to Course
						</Button>
					</>
				) : (
					<Grid width="100%" templateColumns="1fr min-content" px="3rem" columnGap={2}>
						<GridItem colStart={1} colEnd={2}>
							<Button
								leftIcon={<BsCartPlus />}
								onClick={() =>
									addItemToCart({
										courseId: course.id,
										studentId: currentUser.userId,
										price: course.retail_price,
									})
								}
								bg="primaryDark"
								size="lg"
								color="white"
								width="100%"
							>
								Add to Cart
							</Button>
						</GridItem>
						<GridItem colStart={2} colEnd={3} display="flex" alignItems="center" justifyContent="center">
							{addedToWishList ? (
								<BsFillHeartFill cursor="pointer" fontSize="2rem" />
							) : (
								<BiHeartSquare cursor="pointer" fontSize="2rem" />
							)}
						</GridItem>
					</Grid>
				)
			) : (
				<NextLink key={course.link_id} href={`/course/edit/${course.id}`} passHref>
					<Button leftIcon={<EditIcon />} bg="primaryDark" size="lg" mx="3rem" color="white">
						Edit Course Info
					</Button>
				</NextLink>
			)}

			<Text margin="1rem" mx="3rem" fontSize="1rem" as="i">
				30-Day Money-Back Guarantee
			</Text>
			<Heading as="h4" size="md" mt="1rem" mx="3rem">
				This course includes:
			</Heading>
			<List spacing={3} mt="1rem" mx="3rem" fontSize=".9rem">
				<ListItem>
					<ListIcon as={HiOutlinePencilAlt} color={colors.primaryColorDark} />
					Lorem ipsum dolor sit amet, consectetur adipisicing elit
				</ListItem>
				<ListItem>
					<ListIcon as={HiOutlinePencilAlt} color={colors.primaryColorDark} />
					Assumenda, quia temporibus eveniet a libero incidunt suscipit
				</ListItem>
				<ListItem>
					<ListIcon as={HiOutlinePencilAlt} color={colors.primaryColorDark} />
					Quidem, ipsam illum quis sed voluptatum quae eum fugit earum
				</ListItem>
				<ListItem>
					<ListIcon as={HiOutlinePencilAlt} color={colors.primaryColorDark} />
					Quidem, ipsam illum quis sed voluptatum quae eum fugit earum
				</ListItem>
			</List>
		</AsideContainer>
	);
};
