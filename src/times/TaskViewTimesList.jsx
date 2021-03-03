import React, { useState, useEffect } from 'react'
import { Table } from 'react-bootstrap'
import { timeService, alertService } from '@/_services'
import Moment from 'moment'

function TaskViewTimesList({ times }) {
	return (
		<>
			<Table hover striped bordered>
				<thead>
					<tr>
						<th>Hours Used</th>
						<th>Date</th>
						<th>Person</th>
					</tr>
				</thead>
				<tbody>
					{times.length === 0 && (
						<tr>
							<td colSpan="3" className="text-center">
								<div className="p-2">No Time Logged</div>
							</td>
						</tr>
					)}
					{times.map((row) => (
						<tr key={row._id}>
							<td>{row.timeUsed}</td>
							<td>{Moment(row.created_at).format('MM/DD/YYYY')}</td>
							<td>
								{row.userId.firstName} {row.userId.lastName}
							</td>
						</tr>
					))}
				</tbody>
			</Table>
		</>
	)
}

export default TaskViewTimesList
