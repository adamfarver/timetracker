import React from 'react'
import { BrowserRouter } from 'react-router-dom'
import { render } from 'react-dom'
import { library } from '@fortawesome/fontawesome-svg-core'
import {
	faPlus,
	faCheck,
	faEdit,
	faUserCircle,
} from '@fortawesome/free-solid-svg-icons'

library.add(faPlus, faCheck, faEdit, faUserCircle)

import { App } from './app'

import './styles.less'

render(
	<BrowserRouter>
		<App />
	</BrowserRouter>,
	document.getElementById('app')
)
