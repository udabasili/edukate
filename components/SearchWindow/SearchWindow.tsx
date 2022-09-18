import React from 'react';

import {
	Modal,
	ModalOverlay,
	ModalContent,
	ModalHeader,
	ModalCloseButton,
	ModalBody,
	ModalFooter,
	Button,
} from '@chakra-ui/react';
import { clsx } from 'clsx';

type Props = {
	isOpen: boolean;
	onClose: () => void;
	onConfirm?: () => void;
	children: React.ReactNode;
	title?: string;
};

export const SearchWindow = (props: Props) => {
	const { onClose, isOpen, children, title, onConfirm } = props;
	return (
		<Modal isOpen={isOpen} onClose={onClose}>
			<ModalOverlay />
			<ModalContent>
				<ModalHeader>{title}</ModalHeader>
				<ModalCloseButton />
				<ModalBody>{children}</ModalBody>
				{onConfirm ? (
					<ModalFooter>
						<Button colorScheme="red" mr={3} onClick={onClose}>
							Close
						</Button>
						<Button variant="ghost">Secondary Action</Button>
					</ModalFooter>
				) : null}
			</ModalContent>
		</Modal>
	);
};
