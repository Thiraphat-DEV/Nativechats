//create context with reducer and check type login logout 
import { createContext, useReducer, useEffect } from "react";
import { auth } from "../firebase/firebase";
import { onAuthStateChanged } from "firebase/auth";

export const AuthContext = createContext()
export const AuthReducer = (state, action) => {
	switch (action.type) {
		case 'LOGIN': return {...state, user: action.payload}
		case 'LOGOUT' : return {...state, user: null}
		case 'AUTH_READY' : return {user: action.payload, authReady: true}
		default: return state
	}

}

export const AuthContextProvider = ({children}) => {
	const [state, dispatch] = useReducer(AuthReducer, {
		user: null,
		authReady: false
	})

	useEffect(() => {
		const stateChange = onAuthStateChanged(auth, user => {
			dispatch({type: 'AUTH_READY', payload: user})
		})

		stateChange()
		
	}, [])
	console.log(state)

	return (
		<AuthContextProvider value={{...state, dispatch}}>
			{children}
		</AuthContextProvider>
	)
}