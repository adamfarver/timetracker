import React from 'react'
import page404 from '../img/page-404.svg'
import { Container, Row, Col } from 'react-bootstrap'

function index() {
	return (
		<Container className="nf">
			<img src={page404} alt="Page Not Found Image" className="nfimg" />
			<h3 className="caps">OH NOs!?!</h3>
			<p className="caps">Whatever you were looking for isn't there.</p>
		</Container>
	)
}

export default index
