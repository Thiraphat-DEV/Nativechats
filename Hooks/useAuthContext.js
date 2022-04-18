// required hook context from react 
import { useContext } from 'react'
// required context from auth context
import {AuthContext} from '../context/AuthContext'

export const useAuthContext  = () => {
	//apply context
	const context = useContext(AuthContext)

	//check is not context
	if(!context) {
		//show alert
		alert('Error of Authenticated')
	}
	// if have return context 
	return context
}
