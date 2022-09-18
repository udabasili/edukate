import { UserResponse } from '@/features/auth/types';
import { createContext, useReducer } from 'react';

const initialState = {
	currentUser: {} as UserResponse,
	isAuthenticated: false,
	setCurrentUser: (value: UserResponse) => {},
};

type State = {
	currentUser: UserResponse;
	isAuthenticated: boolean;
};

type ActionType = {
	type: 'USER';
	payload: UserResponse;
};

const reducer = (state: State, action: ActionType) => {
	switch (action.type) {
		case 'USER':
			return {
				...state,
				currentUser: action.payload,
				isAuthenticated: Object.keys(action.payload).length !== 0,
			};

		default:
			return state;
	}
};

export const Context = createContext(initialState);

type Props = {
	children: React.ReactNode;
};
const Provider = ({ children }: Props) => {
	const [state, dispatch] = useReducer(reducer, initialState);

	return (
		<Context.Provider
			value={{
				currentUser: state.currentUser,
				isAuthenticated: state.isAuthenticated,
				setCurrentUser: (user: UserResponse) => {
					dispatch({
						type: 'USER',
						payload: user,
					});
				},
			}}
		>
			{children}
		</Context.Provider>
	);
};

export default Provider;
