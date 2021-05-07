import React from 'react'
import Slider from './Slider'
import AboutSection from './AboutSection'
import AboutOrg from './AboutOrg'
import Footer from '../_components/Footer'

function Home() {
	return (
		<div>
			<Slider />
			<AboutSection />
			<AboutOrg />
			<Footer />
		</div>
	)
}

export { Home }
