import React from 'react';
import { Input, InputGroup, InputLeftAddon, InputProps, InputRightAddon } from '@chakra-ui/react';
import { BiSearchAlt2 } from 'react-icons/bi';

export type SearchBoxProps = Partial<InputProps>;

export const SearchBox = (props: SearchBoxProps) => {
	const { ...otherProps } = props;

	return (
		<InputGroup>
			<Input {...otherProps} placeholder="Search for Course..." />
			<InputRightAddon bg="primaryDark">
				<BiSearchAlt2 color="white" />
			</InputRightAddon>
		</InputGroup>
	);
};
