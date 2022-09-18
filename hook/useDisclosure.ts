import { useCallback, useState } from 'react';

export const useDisclosure = () => {
	const [isOpen, setIsOpen] = useState(false);

	const onClose = useCallback(() => setIsOpen(false), []);
	const onOpen = useCallback(() => setIsOpen(true), []);
	// eslint-disable-next-line react-hooks/exhaustive-deps
	const onToggle = useCallback(() => setIsOpen(!isOpen), []);

	return {
		isOpen,
		onClose,
		onOpen,
		onToggle,
	} as const;
};
