import { Line } from 'react-chartjs-2'
import React, { useEffect, useState, useContext } from 'react'
import { AppContext } from '../_components/AppContext'
import '../styles.less'

export default function LineChart() {
	const [chartData, setChartData] = useState({})
	const [project, setProject, sprint, setSprint, user, setUser] = useContext(
		AppContext
	)
	useEffect(() => {
		setChartData({})
	}, [])

	return (
		<div className={'chartcontainer'}>
			<Line
				height={344}
				width={500}
				data={chartData}
				options={{
					legend: {
						position: 'bottom',
					},
					title: {
						text: 'Fake Data - Burn Down',
						fontColor: '#000000',
						fontSize: 16,
						display: true,
					},
					maintainAspectRatio: false,
					spanGaps: true,
					responsive: true,
				}}
			/>
		</div>
	)
}
