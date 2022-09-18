import { Rating } from '@/components/Elements/Rating';
import category, { CATEGORIES } from '@/data/categories';
import { UDEMY } from '@/data/udemy';
import {
	AccordionItem,
	AccordionButton,
	AccordionPanel,
	Box,
	Accordion,
	AccordionIcon,
	Checkbox,
	Heading,
	Flex,
} from '@chakra-ui/react';
import React, { ChangeEvent, useEffect, useReducer } from 'react';
import { Radio, RadioGroup } from '@chakra-ui/react';
import { FilterContainer } from './index.styled';
import _ from 'lodash';
const levels = ['all', 'intermediate', 'expert', 'beginner'] as const;

const initialValues = {
	categories: [],
	rating: null,
	level: 'all' as typeof levels[number],
};

type State = {
	categories: Array<typeof category.categoryName[number]>;
	rating: number | null;
	level: typeof levels[number];
};

type ActionTypes =
	| {
			type: 'AddCategory';
			payload: string;
	  }
	| {
			type: 'RemoveCategory';
			payload: string;
	  }
	| {
			type: 'Rating';
			payload: number;
	  }
	| {
			type: 'Level';
			payload: typeof levels[number];
	  };

const reducer = (state: State, action: ActionTypes) => {
	switch (action.type) {
		case 'AddCategory':
			return {
				...state,
				categories: [...state.categories, action.payload],
			};
		case 'RemoveCategory':
			const currentCategories = state.categories;
			const newCategories = currentCategories.filter((category) => category !== action.payload);
			return {
				...state,
				categories: newCategories,
			};
		case 'Rating':
			return {
				...state,
				rating: action.payload,
			};
		case 'Level':
			return {
				...state,
				level: action.payload,
			};
		default:
			return state;
	}
};

type FilterProps = {
	setFilter: (e: any) => void;
	filterSelected: boolean;
	hideCategoriesFilter: boolean;
	setFilterSelected: (e: boolean) => void;
} & Partial<React.HTMLAttributes<HTMLDivElement>>;

export const Filter = (props: FilterProps) => {
	const { setFilter, hideCategoriesFilter, filterSelected, setFilterSelected, ...otherProps } = props;
	const [state, dispatch] = useReducer(reducer, initialValues);

	useEffect(() => {
		filterSelectedHandler();
		setFilter(state);
	}, [state]);

	function filterSelectedHandler() {
		const filterSelected = state.categories.length !== 0 || state.rating !== null;
		setFilterSelected(filterSelected);
		return filterSelected;
	}

	const toggleCategory = (event: ChangeEvent<HTMLInputElement>) => {
		const value = event.target.value;
		if (state.categories.includes(value)) {
			dispatch({
				type: 'RemoveCategory',
				payload: event.target.value,
			});
		} else {
			dispatch({
				type: 'AddCategory',
				payload: event.target.value,
			});
		}
	};

	const ratingHandler = (event: string) => {
		dispatch({
			type: 'Rating',
			payload: Number(event),
		});
	};

	const changeLevelHandler = (event: typeof levels[number]) => {
		dispatch({
			type: 'Level',
			payload: event,
		});
	};

	return (
		<FilterContainer {...otherProps}>
			<Accordion allowToggle>
				{!hideCategoriesFilter ? (
					<AccordionItem>
						<Heading as="h3" size="lg" className="feature-heading" mb={2}>
							<AccordionButton>
								<Box flex="1" textAlign="left">
									Categories
								</Box>
								<AccordionIcon />
							</AccordionButton>
						</Heading>
						<AccordionPanel display="flex" flexDirection="column">
							{CATEGORIES.map((item) => (
								<Checkbox
									key={item.id}
									checked={state.categories.includes(item.name)}
									value={item.name}
									onChange={toggleCategory}
								>
									{item.name}
								</Checkbox>
							))}
						</AccordionPanel>
						<div></div>
					</AccordionItem>
				) : null}

				<AccordionItem>
					<Heading as="h3" size="lg" className="feature-heading" mb={2}>
						<AccordionButton>
							<Box flex="1" textAlign="left">
								Rating
							</Box>
							<AccordionIcon />
						</AccordionButton>
					</Heading>
					<AccordionPanel display="flex" flexDirection="column">
						<RadioGroup onChange={ratingHandler} value={state.rating?.toString()}>
							{[...Array(5)].map((num, index) => (
								<Radio value={(index + 1).toString()} key={index} display="flex">
									<Flex>
										<Rating selected={index + 1} />
										<span> {index + 1} & up</span>
									</Flex>
								</Radio>
							))}
						</RadioGroup>
					</AccordionPanel>
				</AccordionItem>
				<AccordionItem>
					<Heading as="h3" size="lg" className="feature-heading" mb={2}>
						<AccordionButton>
							<Box flex="1" textAlign="left">
								Level
							</Box>
							<AccordionIcon />
						</AccordionButton>
					</Heading>
					<AccordionPanel display="flex" flexDirection="column">
						<RadioGroup onChange={changeLevelHandler} value={state.level}>
							{levels.map((level, index) => (
								<Radio value={level} key={level} display="flex">
									<Flex>
										<span>{_.capitalize(level)}</span>
									</Flex>
								</Radio>
							))}
						</RadioGroup>
					</AccordionPanel>
				</AccordionItem>
			</Accordion>
		</FilterContainer>
	);
};
