import React, { useContext } from 'react'
import { AppContext } from './AppContext'
import { Route , Redirect} from 'react-router-dom'
export const ProtectRoute = ({ children, ...rest }) => {
	let [
		project,
		setProject,
		sprint,
		setSprint,
		user,
		setUser,
		task,
		setTask,
	] = useContext(AppContext)
	return (
		<>
			<Route
				{...rest}
				render={({ location }) =>
					user.token ? (
						children
					) : (
						<Redirect
							to={{
								pathname: '/login',
								state: { from: location },
							}}
						/>
					)
				}
			/>
		</>
	)
}
