import { Line } from 'react-chartjs-2'
import React, { useEffect, useState } from 'react'
import '../styles.less'

export default function LineChart() {
	const [chartData, setChartData] = useState({
		labels: ['21', '22', '23', '24', '25', '27', '28'],
		datasets: [
			{
				label: 'Projected Pace',
				borderColor: '#333333',
				data: [500, , , , , , 0],
				fill: 'origin',
			},
			{
				label: 'Used Hours',
				borderColor: '#ff0000',
				data: [500, 425, 389, 311, 253, 128, 74],
				fill: false,
				lineTension: 0,
			},
		],
	})
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
