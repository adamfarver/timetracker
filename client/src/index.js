import React from 'react'
import { BrowserRouter } from 'react-router-dom'
import { render } from 'react-dom'
import { library } from '@fortawesome/fontawesome-svg-core'
import {
	faGithub,
	faOsi,
	faTwitter,
	faStackOverflow,
} from '@fortawesome/free-brands-svg-icons'
import {
	faPlus,
	faCheck,
	faEdit,
	faUserCircle,
	faUsers,
} from '@fortawesome/free-solid-svg-icons'
library.add(
	faPlus,
	faCheck,
	faEdit,
	faUserCircle,
	faGithub,
	faOsi,
	faUsers,
	faTwitter,
	faStackOverflow
)

import { App } from './app/Index.jsx'
import '../node_modules/bootstrap/scss/bootstrap.scss'
// import './sass/main.css'
import './styles.scss'

render(
	<BrowserRouter>
		<App />
	</BrowserRouter>,
	document.getElementById('app')
)
