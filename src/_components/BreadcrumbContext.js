import React, { useState, createContext, useEffect } from 'react'
export const BreadcrumbContext = createContext()
export function BreadcrumbProvider(props) {
	const [project, setProject] = useState({ id: '', name: '' })
	const [sprint, setSprint] = useState({ id: '', number: '' })

	return (
		<BreadcrumbContext.Provider
			value={[project, setProject, sprint, setSprint]}
		>
			{props.children}
		</BreadcrumbContext.Provider>
	)
}
