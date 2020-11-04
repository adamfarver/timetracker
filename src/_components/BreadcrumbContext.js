import React, { useState, createContext } from 'react'
export const BreadcrumbContext = createContext()
export function BreadcrumbProvider(props) {
	const [project, setProject] = useState({ _id: '', name: '' })
	const [sprint, setSprint] = useState({ _id: '', name: '' })

	return (
		<BreadcrumbContext.Provider
			value={[project, setProject, sprint, setSprint]}
		>
			{props.children}
		</BreadcrumbContext.Provider>
	)
}
