import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
function Footer() {
	return (
		<>
			{/* TODO: #40 Convert to React-Bootstrap */}
			<footer className="footer ptb-120">
				<div className="container">
					<div className="row">
						<div className="col-md-6">
							<div className="who">
								<h4 className="h4 mb-20">About This Project</h4>
								<p>
									This is a project by Adam Farver. Thanks for stopping by. All
									data entered is reset at 15 minute intervals.
								</p>
							</div>
						</div>
						<div className="col-md-2">
							<div className="links">
								<h4 className="h4 mb-20">Help</h4>
								<ul>
									<li>
										<a href="#0">FAQ</a>
									</li>
									<li>
										<a href="#0">Licensing</a>
									</li>
								</ul>
							</div>
						</div>
						<div className="col-md-4">
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
											<a href="#0">
												<FontAwesomeIcon icon={['fab', 'twitter']} size="2x" />
											</a>
										</div>
									</div>
									<div className="ico">
										<div className="icon d-flex justify-content-center align-items-center">
											<a href="#0">
												<FontAwesomeIcon
													icon={['fab', 'stack-overflow']}
													size="2x"
												/>
											</a>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</footer>
		</>
	)
}

export default Footer
