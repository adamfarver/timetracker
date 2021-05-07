import React, { useState, useContext } from 'react'
import { AppContext } from '../_components/AppContext'

export function claimItem(e, taskSelected, currentUser) {
	const [claimed, setClaimed] = useState(false)
	const [tasks, setTasks] = useState([])

	if (e.target.innerHTML === 'Claim') {
		task.claimedBy = user._id
		setTask(task)
		setClaimed(!claimed)
		console.log(task.claimedBy)
	} else {
		task.claimedBy = null
		setTask(task)
		setClaimed(!claimed)
		console.log(task.claimedBy)
	}
	try {
		taskService
			.update(task._id, task)
			.then(() => alertService.success(`Task claimed by ${user.firstName}`))
	} catch (error) {
		alertService.error(
			'Problems with Database Connection. Please contact your system administrator.'
		)
	}
}
