import React, { useState, createContext } from 'react'
export const AppContext = createContext()
export function AppProvider(props) {
	const [project, setProject] = useState({ id: '', name: '' })
	const [sprint, setSprint] = useState({ id: '', number: '' })
	const [user, setUser] = useState({ id: '', name: '', isSelected: false })

	return (
		<AppContext.Provider
			value={[project, setProject, sprint, setSprint, user, setUser]}
		>
			{props.children}
		</AppContext.Provider>
	)
}
