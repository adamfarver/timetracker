import { faGithub } from '@fortawesome/free-brands-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'
import { Container, Row, Col } from 'react-bootstrap'
import Webdashboard from '../img/Web Dashboard.svg'

function Slider() {
	return (
		<>
			<section className="slider d-flex align-items-center">
				<Container>
					<div className="content">
						<Row className="d-flex align-items-center">
							<Col lg={6}>
								<img src={Webdashboard} alt="slider" className="img-fluid " />
							</Col>
							<Col lg={6}>
								<div className="text">
									<h1 className="h1-white">
										Track time and make accurate job estimates.
									</h1>
									<p className="p-white">
										Copy our code and spin up your own service to <br />
										manage time and keep multiple users task-focused.
									</p>
									<a
										href="https://github.com/adamfarver/timetracker"
										className="btn-white d-inline-flex align-items-center"
										target="_blank"
										rel="noreferrer"
									>
										<FontAwesomeIcon icon={faGithub} className="mr-2" />
										<span>Download Now </span>
									</a>
								</div>
							</Col>
						</Row>
					</div>
				</Container>
			</section>
		</>
	)
}

export default Slider
