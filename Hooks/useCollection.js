import {useState, useEffect} from 'react'
import {db} from '../firebase/firebase'

import { onSnapshot, collection } from 'firebase/firestore'

export const useCollection = (dbc, _q) => {
	const [document, setDocument]=  useState(null)

	// run effect 
	useEffect(() => {
		//create reference get db, table
		let referenceDb = collection(db, dbc)
		// apply snapshot of database with reference and send doc of db 
		const useSnapShot = onSnapshot(referenceDb, (doc) => {
			//create results for db
			let results = []
			// loop every round and push to results 
			doc.docs.forEach((doc) => {
				results.push({id: doc.id,  ...doc.data()})
			})
			// send result to document 
			setDocument(results)
		})
		// apply useSnapshot
		useSnapShot()

		// clean up useSnapshot everything of run function useSnapshot
		return () => useSnapShot
		//mutage every table is changed
	}, [dbc])

	// return document is apply
	return {document}
}