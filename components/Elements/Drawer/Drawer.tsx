import {
	Button,
	Drawer,
	DrawerOverlay,
	DrawerContent,
	DrawerCloseButton,
	DrawerHeader,
	DrawerBody,
	Input,
	DrawerFooter,
} from '@chakra-ui/react';
import React from 'react';

type Drawer = {
	isOpen: boolean;
	onClose: () => void;
	children: React.ReactNode;
	title: string;
	onSubmit: () => void;
	Footer?: React.ReactElement;
};

export const CustomDrawer = (props: Drawer) => {
	const { isOpen, onClose, children, title, onSubmit, Footer } = props;
	const btnRef = React.useRef(null);

	return (
		<>
			<Drawer isOpen={isOpen} placement="right" onClose={onClose} finalFocusRef={btnRef}>
				<DrawerOverlay />
				<DrawerContent>
					<DrawerCloseButton />
					<DrawerHeader>{title}</DrawerHeader>

					<DrawerBody>{children}</DrawerBody>
					{Footer ? (
						Footer
					) : (
						<DrawerFooter>
							<>
								<Button variant="outline" mr={3} onClick={onClose}>
									Cancel
								</Button>
								<Button colorScheme="blue" onClick={onSubmit}>
									Save
								</Button>
							</>
						</DrawerFooter>
					)}
				</DrawerContent>
			</Drawer>
		</>
	);
};
