import React from 'react'
import PropTypes from 'prop-types'
import { Card } from 'react-bootstrap'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

function AboutCard({ image, headline, subtext1 }) {
	return (
		<>
			<Card className="box">
				<div className="circle">
					<FontAwesomeIcon
						className={'card-image-top svg-center fa-3x'}
						icon={image}
					/>
				</div>
				<h3 className="h3">{headline}</h3>
				<p className="p-dark features">{subtext1}</p>
			</Card>
		</>
	)
}

AboutCard.propTypes = {
	image: PropTypes.oneOfType([
		PropTypes.string,
		PropTypes.array,
		PropTypes.object,
	]).isRequired,
	headline: PropTypes.string.isRequired,
	subtext1: PropTypes.string.isRequired,
}
export default AboutCard
