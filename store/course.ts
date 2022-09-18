import { sampleData } from '@/data/description';

export const initialState = {
	description: sampleData,
	category: 'Development',
	title: '',
	imageUrl: 'https://cdn.pixabay.com/photo/2019/03/30/14/06/online-4091231_1280.jpg',
	price: 30,
	lectures: 40,
	duration: 60,
	level: 'all',
};

export type ActionType =
	| {
			type: 'description';
			payload: string;
	  }
	| {
			type: 'category';
			payload: string;
	  }
	| {
			type: 'title';
			payload: string;
	  }
	| {
			type: 'imageUrl';
			payload: string;
	  }
	| {
			type: 'price';
			payload: number;
	  }
	| {
			type: 'lectures';
			payload: number;
	  }
	| {
			type: 'duration';
			payload: number;
	  }
	| {
			type: 'level';
			payload: string;
	  };

export const reducer = (state: typeof initialState, action: ActionType) => {
	switch (action.type) {
		case 'description':
			return {
				...state,
				description: action.payload,
			};
		case 'category':
			return {
				...state,
				category: action.payload,
			};
		case 'title':
			return {
				...state,
				title: action.payload,
			};
		case 'imageUrl':
			return {
				...state,
				imageUrl: action.payload,
			};
		case 'price':
			return {
				...state,
				price: action.payload,
			};
		case 'lectures':
			return {
				...state,
				lectures: action.payload,
			};
		case 'duration':
			return {
				...state,
				duration: action.payload,
			};

		case 'level':
			return {
				...state,
				level: action.payload,
			};

		default:
			return state;
	}
};
