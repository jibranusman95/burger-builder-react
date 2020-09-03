import React, { Fragment } from 'react';

import classes from './Layout.css';
import Toolbar from '../Navigation/Toolbar/Toolbar';
import Sidedrawer from '../Navigation/Sidedrawer/Sidedrawer';

const layout = (props) => (
	<Fragment>
		<Toolbar />
		<Sidedrawer />
		<div>Toolbar, Sidebar, Backdrop</div>
		<main className={classes.content}>
			{props.children}
		</main>
	</Fragment>
);

export default layout;
