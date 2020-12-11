import React, { useState, createContext } from 'react'
export const AppContext = createContext()
export function AppProvider(props) {
	// Get current items from localstorage and convert to objects

	let localProject = localStorage.getItem('current_project')
	localProject = JSON.parse(localProject)
	let localSprint = localStorage.getItem('current_sprint')
	localSprint = JSON.parse(localSprint)
	let localUser = localStorage.getItem('current_user')
	localUser = JSON.parse(localUser)

	const [project, setProject] = useState(localProject || { _id: '', name: '' })
	const [sprint, setSprint] = useState(localSprint || { _id: '', number: '' })
	const [user, setUser] = useState(
		localUser || {
			_id: '',
			name: '',
			isSelected: false,
		}
	)
	return (
		<AppContext.Provider
			value={[project, setProject, sprint, setSprint, user, setUser]}
		>
			{props.children}
		</AppContext.Provider>
	)
}
