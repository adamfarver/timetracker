import React from 'react'
import { Container, Row, Col } from 'react-bootstrap'
import AboutCard from './AboutCard'

function AboutSection() {
	return (
		<>
			<section className="about">
				<Container className="text-center ">
					<Row>
						<Col lg={6}>
							<AboutCard
								image="users"
								// image alt text below
								headline="Multi-User"
								subtext1="Unlimited number of users, at no extra cost."
								subtext2="This is not your average TODO list."
							/>
						</Col>
						<Col lg={6}>
							<AboutCard
								image={['fab', 'osi']}
								// image alt text below
								headline="Open-Source"
								subtext1="Customizable to fit your needs, now, and into the future."
							/>
						</Col>
					</Row>
				</Container>
			</section>
		</>
	)
}

export default AboutSection
