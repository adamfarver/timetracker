import React from 'react'
import { Row, Col } from 'react-bootstrap'
import Collab from '../img/Collaboration illustration.svg'

function AboutOrg() {
	return (
		<>
			<section className="company">
				<>
					<Row className="d-flex align-items-center">
						<Col lg={6}>
							<div className="text text-1">
								<h2 className="h2">Use sprints to see your progress.</h2>
								<p className="p-dark">
									{`Using Agile software development methodologies, you can power through your iterative sessions. Get work done by creating in short, measurable bursts. It's not just for software development but can be used in many types of creative work. `}
								</p>
							</div>
						</Col>
						<Col lg={6}>
							<img
								src={Collab}
								alt="Collaboration and progress"
								className="img-fluid"
							/>
						</Col>{' '}
					</Row>
				</>
			</section>
		</>
	)
}

export default AboutOrg
