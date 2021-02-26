import React, { useState, useEffect } from 'react'
import { Table } from 'react-bootstrap'
import { timeService, alertService } from '@/_services'

function TaskViewTimesList() {
	const [tableData, setTableData] = useState([
		{
			// Sample Data
			_id: 1,
			timeUsed: 8,
			userId: { firstName: 'Adam', lastName: 'Farver' },
			created_at: '2021-02-26T14:04:59.509Z',
		},
	])

	return (
		<>
			<p>
				<b>Time Log</b>
			</p>
			<Table hover striped bordered>
				<thead>
					<tr>
						<th>Hours Used</th>
						<th>Date</th>
						<th>Person</th>
					</tr>
				</thead>
				<tbody>
					{tableData.length === 0 && (
						<tr>
							<td colSpan="3" className="text-center">
								<div className="p-2">No Time Logged</div>
							</td>
						</tr>
					)}
					{tableData.map((row) => (
						<tr key={row._id}>
							<td>{row.timeUsed}</td>
							<td>{row.created_at}</td>
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
