import React from 'react'
import { Container, Row, Col } from 'react-bootstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
function Footer() {
	return (
		<>
			<footer className="footer ptb-120">
				<Container>
					<Row>
						<Col md={6}>
							<div className="who">
								<h4 className="h4 mb-20">About This Project</h4>
								<p>
									This is a project by Adam Farver. Thanks for stopping by. All
									data entered is reset at midnight, daily.
								</p>
							</div>
						</Col>

						<Col md={4}>
							<div className="social">
								<h4 className="h4 mb-20">Social Media</h4>
								<div className="icons">
									<div className="ico">
										<div className="icon d-flex justify-content-center align-items-center">
											<a
												href="https://github.com/adamfarver"
												target="_blank"
												rel="noreferrer"
											>
												<FontAwesomeIcon icon={['fab', 'github']} size="2x" />
											</a>
										</div>
									</div>
									<div className="ico">
										<div className="icon d-flex justify-content-center align-items-center">
											<a
												href="http://www.twitter.com/adamfarver"
												target="_blank"
												rel="noreferrer"
											>
												<FontAwesomeIcon icon={['fab', 'twitter']} size="2x" />
											</a>
										</div>
									</div>
									<div className="ico">
										<div className="icon d-flex justify-content-center align-items-center">
											<a
												href="https://stackoverflow.com/users/10007749/adam-farver"
												target="_blank"
												rel="noreferrer"
											>
												<FontAwesomeIcon
													icon={['fab', 'stack-overflow']}
													size="2x"
												/>
											</a>
										</div>
									</div>
								</div>
							</div>
						</Col>
					</Row>
				</Container>
			</footer>
		</>
	)
}

export default Footer
