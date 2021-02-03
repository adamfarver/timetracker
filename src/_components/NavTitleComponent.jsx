import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { useContext } from 'react'
import { AppContext } from './AppContext'

function NavTitleComponent() {
	const [project, setProject, sprint, setSprint, user, setUser] = useContext(
		AppContext
	)
	return (
		<>
			<FontAwesomeIcon icon="user-circle" />
		</>
	)
}

export default NavTitleComponent
