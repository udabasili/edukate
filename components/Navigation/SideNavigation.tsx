import { Avatar } from '@chakra-ui/react';
import { useDisclosure } from '@/hook/useDisclosure';
import React, { useContext, useState } from 'react';
import { BsCartPlus } from 'react-icons/bs';
import NextLink from 'next/link';
import { CustomDrawer } from '../Elements';
import { SideNav } from './SideNavigation.styled';
import { Context } from '@/store/appContext';
import { BiBookOpen } from 'react-icons/bi';
import { CartFooter } from '@/features/cart/components/CartFooter';
import { CartList } from '@/features/cart';

export const SideNavigation = () => {
	const { onOpen, onClose, isOpen } = useDisclosure();
	const [total, setTotal] = useState<number | null>(null);
	const { currentUser } = useContext(Context);

	return (
		<SideNav>
			<Avatar
				title={currentUser.name}
				bg="secondary"
				name={currentUser.name}
				src={currentUser.imageUrl}
				className="user"
			/>
			{currentUser.type === 'student' ? (
				<>
					{/* <NextLink href="/my-wishlist" passHref>
				<Avatar
					title="My Wishlist"
					bg="black"
					icon={<BsHeart fontSize="1.5rem" color="white" />}
					cursor="pointer"
					className="cart"
				/>
			</NextLink> */}
					<NextLink href="/my-classes" passHref>
						<Avatar
							title="My Classes"
							bg="black"
							icon={<BiBookOpen fontSize="1.5rem" color="white" />}
							cursor="pointer"
							className="cart"
						/>
					</NextLink>
					<Avatar
						bg="black"
						icon={<BsCartPlus fontSize="1.5rem" color="white" />}
						onClick={onOpen}
						cursor="pointer"
						className="cart"
					></Avatar>
					<CustomDrawer
						isOpen={isOpen}
						Footer={<CartFooter total={total} />}
						onClose={onClose}
						title="Shopping Cart"
						onSubmit={function (): void {}}
					>
						<CartList setTotal={setTotal} />
					</CustomDrawer>
				</>
			) : null}
		</SideNav>
	);
};
